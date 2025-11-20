using Microsoft.AspNetCore.Identity;
using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Authentication.JWT;
using NeuronaLabs.Domain;
using NeuronaLabs.Domain.Repositories.Patients;

namespace NeuronaLabs.Services.Authentication;

public class AuthenticationService(
    IPatientRepository patientRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IPasswordHasher<Patient> passwordHasher
) : IAuthenticationService
{
    private readonly IPatientRepository _patientRepository = patientRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator = jwtTokenGenerator;
    private readonly IPasswordHasher<Patient> _passwordHasher = passwordHasher;

    public async Task<GetLoginResponse> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken
    )
    {
        var patient =
            await _patientRepository.GetPatientByEmailAsync(email, cancellationToken)
            ?? throw new InvalidOperationException("Invalid email or password.");

        var result = _passwordHasher.VerifyHashedPassword(patient, patient.PasswordHash, password);
        if (result == PasswordVerificationResult.Failed)
        {
            throw new InvalidOperationException("Invalid email or password.");
        }

        var token = _jwtTokenGenerator.GenerateToken(patient);

        if (string.IsNullOrEmpty(token))
        {
            throw new InvalidOperationException("Could not generate JWT token.");
        }

        return new GetLoginResponse(patient.FirstName, patient.LastName, patient.Email, token);
    }

    public async Task<RegisteredPatientResponse> RegisterAsync(
        CreatePatientRequest input,
        CancellationToken cancellationToken
    )
    {
        var normalizedEmail = NormalizeEmail(input.Email);

        var userExists = await _patientRepository.GetPatientByEmailAsync(
            normalizedEmail,
            cancellationToken
        );
        if (userExists != null)
        {
            throw new InvalidOperationException(
                $"User with this email '{input.Email}' already exists."
            );
        }

        var patient = new Patient(input.FirstName, input.LastName, normalizedEmail, input.Age);

        patient.SetPasswordHash(_passwordHasher.HashPassword(patient, input.Password));

        var createdPatient = await _patientRepository.CreatePatientAsync(
            patient,
            cancellationToken
        );

        var token = _jwtTokenGenerator.GenerateToken(createdPatient);
        if (string.IsNullOrEmpty(token))
        {
            throw new InvalidOperationException("Could not generate JWT token.");
        }

        return new RegisteredPatientResponse(
            createdPatient.FirstName,
            createdPatient.LastName,
            createdPatient.Email,
            token
        );
    }

    private string NormalizeEmail(string email) => email.Trim().ToLowerInvariant();
}

using Microsoft.AspNetCore.Identity;
using NeuronaLabs.Authentication.JWT;
using NeuronaLabs.Domain;
using NeuronaLabs.Domain.Repositories.Patients;
using NeuronaLabs.DTOs.Requests;
using NeuronaLabs.DTOs.Responses;

namespace NeuronaLabs.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IPatientRepository _patientRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IPasswordHasher<Patient> _passwordHasher;

    public AuthenticationService(
        IPatientRepository patientRepository,
        IJwtTokenGenerator jwtTokenGenerator,
        IPasswordHasher<Patient> passwordHasher)
    {
        _patientRepository = patientRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
        _passwordHasher = passwordHasher;
    }

    public async Task<GetLoginResponse> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken
        )
    {
        var patient = await _patientRepository.GetPatientByEmailAsync(email, cancellationToken)
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

    public async Task<RegisteredPatientResponse> RegisterAsync(CreatePatientRequest input, CancellationToken cancellationToken)
    {
        var normalizedEmail = input.Email.Trim().ToLowerInvariant();

        var userExists = await _patientRepository.GetPatientByEmailAsync(normalizedEmail, cancellationToken);
        if (userExists != null)
        {
            throw new InvalidOperationException($"User with this email '{input.Email}' already exists.");
        }

        var patient = new Patient
        {
            FirstName = input.FirstName,
            LastName = input.LastName,
            Email = normalizedEmail,
            Age = input.Age,
            PasswordHash = string.Empty, // TODO: Resolve as nullable
        };

        if (input.Diagnostic is not null)
        {
            var diagnostic = new Diagnose
            {
                DiagnosisText = input.Diagnostic.DiagnosisText,
                Notes = input.Diagnostic.Notes,
            };

            patient.Diagnostics.Add(diagnostic);
        }

        patient.PasswordHash = _passwordHasher.HashPassword(patient, input.Password);

        var createdPatient = await _patientRepository.CreatePatientAsync(patient, cancellationToken);

        var token = _jwtTokenGenerator.GenerateToken(createdPatient);
        if (string.IsNullOrEmpty(token))
        {
            throw new InvalidOperationException("Could not generate JWT token.");
        }

        return new RegisteredPatientResponse(createdPatient.FirstName, createdPatient.LastName, createdPatient.Email, token);
    }
}

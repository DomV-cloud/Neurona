using Microsoft.AspNetCore.Identity;
using NeuronaLabs.Authentication.JWT;
using NeuronaLabs.Domain;
using NeuronaLabs.Domain.Repositories.Patients;
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
}

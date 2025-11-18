using Microsoft.AspNetCore.Identity;
using NeuronaLabs.Authentication.JWT;
using NeuronaLabs.Domain;
using NeuronaLabs.DTOs.Requests;
using NeuronaLabs.DTOs.Responses;
using NeuronaLabs.Services.QueryServices;

namespace NeuronaLabs.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly AuthenticationQueryService _authenticationQueryService;
    private readonly AuthenticationMutationService _authenticationMutationService;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IPasswordHasher<Patient> _passwordHasher;

    public AuthenticationService(
        AuthenticationQueryService patientQueryService,
        AuthenticationMutationService authenticationMutationService,
        IJwtTokenGenerator jwtTokenGenerator,
        IPasswordHasher<Patient> passwordHasher)
    {
        _authenticationQueryService = patientQueryService;
        _authenticationMutationService = authenticationMutationService;
        _jwtTokenGenerator = jwtTokenGenerator;
        _passwordHasher = passwordHasher;
    }

    public async Task<GetLoginResponse> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken
        )
    {
        var patient = await _authenticationQueryService.GetPatientByEmailAsync(email, cancellationToken)
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

    public async Task<PatientRegisteredResponse> RegisterAsync(RegisterPatientRequest request, CancellationToken cancellationToken)
    {
        var isEmailRegistered = await _authenticationQueryService.IsEmailRegisteredAsync(request.Email, cancellationToken);

        if (isEmailRegistered)
        {
            throw new InvalidOperationException("Email is already registered.");
        }

        var newPatient = await _authenticationMutationService.RegisterPatientAsync(request, cancellationToken);

        if (newPatient is null)
        {
            throw new InvalidOperationException("Failed to create new patient.");
        }

        return newPatient;
    }
}

using Microsoft.AspNetCore.Identity.Data;
using NeuronaLabs.DTOs.Requests;
using NeuronaLabs.DTOs.Responses;
using NeuronaLabs.Services.Authentication;
using LoginRequest = NeuronaLabs.DTOs.Requests.LoginRequest;

namespace NeuronaLabs.Mutation;

public class Mutation
{
    // LOGIN
    public Task<GetLoginResponse> Login(
        LoginRequest input,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken)
        => authService.LoginAsync(input.Email, input.Password, cancellationToken);

    // REGISTRATION
    public Task<PatientRegisteredResponse> RegisterPatient(
        RegisterPatientRequest request,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken)
        => authService.RegisterAsync(request, cancellationToken);
}

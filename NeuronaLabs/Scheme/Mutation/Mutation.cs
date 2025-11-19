using NeuronaLabs.DTOs.Responses;
using NeuronaLabs.Services.Authentication;
using LoginRequest = NeuronaLabs.DTOs.Requests.LoginRequest;

namespace NeuronaLabs.Scheme.Mutation;

public class Mutation
{
    // LOGIN
    public Task<GetLoginResponse> Login(
        LoginRequest input,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken)
        => authService.LoginAsync(input.Email, input.Password, cancellationToken);
}

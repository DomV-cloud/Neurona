using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;

namespace NeuronaLabs.Services.Authentication;

public interface IAuthenticationService
{
    public Task<GetLoginType> LoginAsync(LoginType input, CancellationToken cancellationToken);
    public Task<RegisteredPatientType> RegisterAsync(
        CreatePatientRequest input,
        CancellationToken cancellationToken
    );
}

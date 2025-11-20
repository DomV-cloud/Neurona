using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;

namespace NeuronaLabs.Services.Authentication;

public interface IAuthenticationService
{
    public Task<GetLoginResponse> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken
    );
    public Task<RegisteredPatientResponse> RegisterAsync(
        CreatePatientRequest input,
        CancellationToken cancellationToken
    );
}

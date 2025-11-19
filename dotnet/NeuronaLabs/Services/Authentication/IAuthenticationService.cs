using NeuronaLabs.DTOs.Requests;
using NeuronaLabs.DTOs.Responses;

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

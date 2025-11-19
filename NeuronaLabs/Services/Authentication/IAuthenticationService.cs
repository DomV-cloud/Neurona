using NeuronaLabs.DTOs.Responses;

namespace NeuronaLabs.Services.Authentication;

public interface IAuthenticationService
{
    public Task<GetLoginResponse> LoginAsync(string email, string password, CancellationToken cancellationToken);
}

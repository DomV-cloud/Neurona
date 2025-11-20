using NeuronaLabs.Application.GraphQL.Inputs;
using NeuronaLabs.Application.GraphQL.Types;

namespace NeuronaLabs.Application.Authentication;

public interface IAuthenticationService
{
    public Task<GetLoginType> LoginAsync(LoginType input, CancellationToken cancellationToken);
    public Task<RegisteredPatientType> RegisterAsync(
        CreatePatientInput input,
        CancellationToken cancellationToken
    );
}

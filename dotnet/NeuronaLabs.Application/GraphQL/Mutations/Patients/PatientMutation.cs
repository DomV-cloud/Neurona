using NeuronaLabs.Application.Authentication;
using NeuronaLabs.Application.GraphQL.Inputs;
using NeuronaLabs.Application.GraphQL.Types;

namespace NeuronaLabs.Application.GraphQL.Mutations.Patients;

public class PatientMutation
{
    public async Task<GetLoginType> Login(
        LoginType input,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken
    ) => await authService.LoginAsync(input, cancellationToken);

    public async Task<RegisteredPatientType> Register(
        CreatePatientInput input,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken
    ) => await authService.RegisterAsync(input, cancellationToken);
}

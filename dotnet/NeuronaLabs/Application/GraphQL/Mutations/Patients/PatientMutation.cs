using NeuronaLabs.Application.DomainServices.Diagnoses;
using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Services.Authentication;

namespace NeuronaLabs.Application.GraphQL.Mutations.Patients;

public class PatientMutation
{
    public async Task<GetLoginType> Login(
        LoginType input,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken
    ) => await authService.LoginAsync(input, cancellationToken);

    public async Task<RegisteredPatientType> Register(
        CreatePatientRequest input,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken
    ) => await authService.RegisterAsync(input, cancellationToken);
}

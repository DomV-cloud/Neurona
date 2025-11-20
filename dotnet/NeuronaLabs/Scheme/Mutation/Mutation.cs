using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Domain.Repositories.Diagnose;
using NeuronaLabs.Services.Authentication;
using LoginRequest = NeuronaLabs.Application.DTOs.Requests.LoginRequest;

namespace NeuronaLabs.Scheme.Mutation;

public class Mutation
{
    public async Task<GetLoginResponse> Login(
        LoginRequest input,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken
    ) => await authService.LoginAsync(input.Email, input.Password, cancellationToken);

    public async Task<RegisteredPatientResponse> Register(
        CreatePatientRequest input,
        [Service] IAuthenticationService authService,
        CancellationToken cancellationToken
    ) => await authService.RegisterAsync(input, cancellationToken);

    public async Task<UpdatedPatientDiagnose> UpdatedPatientDiagnose(
        UpdatePatientDiagnoseRequest input,
        [Service] IDiagnoseRepository patientRepository,
        CancellationToken cancellationToken
    ) => await patientRepository.UpdateDiagnose(input, cancellationToken);
}

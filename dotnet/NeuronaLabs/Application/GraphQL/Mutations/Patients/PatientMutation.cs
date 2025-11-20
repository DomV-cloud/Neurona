using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Domain.Repositories.Diagnosis;
using NeuronaLabs.Services.Authentication;
using LoginRequest = NeuronaLabs.Application.DTOs.Requests.LoginRequest;

namespace NeuronaLabs.Application.GraphQL.Mutations.Patients;

public class PatientMutation
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

    public async Task<UpdatedPatientDiagnosis> UpdatedPatientDiagnosis(
        UpdatePatientDiagnosisRequest input,
        [Service] IDiagnosisRepository patientRepository,
        CancellationToken cancellationToken
    ) => await patientRepository.UpdateDiagnosis(input, cancellationToken);
}

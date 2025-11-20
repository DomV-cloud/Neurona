using NeuronaLabs.Application.DomainServices.Diagnoses;
using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Application.GraphQL.Inputs;
using NeuronaLabs.Application.GraphQL.Mutations.Patients;
using NeuronaLabs.Application.GraphQL.Types;

namespace NeuronaLabs.Application.GraphQL.Mutations.Diagnoses;

[ExtendObjectType(typeof(PatientMutation))]
public class DiagnosisMutation
{
    public async Task<UpdatedPatientDiagnosisType> UpdatedPatientDiagnosis(
        UpdatePatientDiagnosisRequest input,
        [Service] IDiagnosisService patientRepository,
        CancellationToken cancellationToken
    ) => await patientRepository.UpdateDiagnosisAsync(input, cancellationToken);

    public async Task<CreatedPatientDiagnosisType> CreateDiagnosis(
        CreateDiagnosisInput input,
        [Service] IDiagnosisService diagnosisService,
        CancellationToken cancellationToken
    ) => await diagnosisService.CreateDiagnosisAsync(input, cancellationToken);
}

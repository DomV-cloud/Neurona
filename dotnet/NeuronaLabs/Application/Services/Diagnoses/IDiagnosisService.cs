using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Application.GraphQL.Inputs;
using NeuronaLabs.Application.GraphQL.Types;

namespace NeuronaLabs.Application.DomainServices.Diagnoses;

public interface IDiagnosisService
{
    Task<CreatedPatientDiagnosisType> CreateDiagnosisAsync(
        CreateDiagnosisInput diagnosis,
        CancellationToken cancellationToken
    );
    Task<UpdatedPatientDiagnosisType> UpdateDiagnosisAsync(
        UpdatePatientDiagnosisRequest request,
        CancellationToken cancellationToken
    );
}

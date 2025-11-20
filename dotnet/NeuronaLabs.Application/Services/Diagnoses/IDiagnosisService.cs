using NeuronaLabs.Application.GraphQL.Inputs;
using NeuronaLabs.Application.GraphQL.Types;

namespace NeuronaLabs.Application.ApplicationServices.Diagnoses;

public interface IDiagnosisService
{
    Task<CreatedPatientDiagnosisType> CreateDiagnosisAsync(
        CreateDiagnosisInput diagnosis,
        CancellationToken cancellationToken
    );
    Task<UpdatedPatientDiagnosisType> UpdateDiagnosisAsync(
        UpdatePatientDiagnosisInput request,
        CancellationToken cancellationToken
    );
}

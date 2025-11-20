using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;

namespace NeuronaLabs.Domain.Repositories.Diagnosis;

public interface IDiagnosisRepository
{
    Task<UpdatedPatientDiagnosis> UpdateDiagnosis(
        UpdatePatientDiagnosisRequest request,
        CancellationToken cancellationToken
    );
}

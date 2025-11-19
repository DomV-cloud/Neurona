using NeuronaLabs.DTOs.Requests;
using NeuronaLabs.DTOs.Responses;

namespace NeuronaLabs.Domain.Repositories.Diagnose;

public interface IDiagnoseRepository
{
    Task<UpdatedPatientDiagnose> UpdateDiagnose(
        UpdatePatientDiagnoseRequest request,
        CancellationToken cancellationToken
    );
}

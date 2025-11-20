using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;

namespace NeuronaLabs.Domain.Repositories.Diagnose;

public interface IDiagnoseRepository
{
    Task<UpdatedPatientDiagnose> UpdateDiagnose(
        UpdatePatientDiagnoseRequest request,
        CancellationToken cancellationToken
    );
}

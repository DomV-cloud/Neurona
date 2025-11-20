using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Domain.Repositories.Patients;

namespace NeuronaLabs.Scheme.Query;

public class Query
{
    public Task<PagedResponse<GetAllPatientsResponse>> GetAll(
        [Service] IPatientRepository patientRepository,
        int page = 1,
        int pageSize = 50,
        CancellationToken cancellationToken = default
    ) => patientRepository.GetAllPatientsAsync(pageSize, page, cancellationToken);

    public Task<GetPatientDetailInfoResponse> GetPatientDetails(
        Guid patientId,
        [Service] IPatientRepository patientRepository,
        CancellationToken cancellationToken
    ) => patientRepository.GetPatientDetailInfoAsync(patientId, cancellationToken);
}

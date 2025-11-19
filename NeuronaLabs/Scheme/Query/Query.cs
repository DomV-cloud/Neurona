using NeuronaLabs.Domain.Repositories.Patients;
using NeuronaLabs.DTOs.Responses;

namespace NeuronaLabs.Scheme.Query;

public class Query
{
    public Task<PagedResponse<GetAllPatientsResponse>> GetAll(
       [Service] IPatientRepository patientRepository,
       int page = 1,
       int pageSize = 50,
       CancellationToken cancellationToken = default
        )
       => patientRepository.GetAllPatientsAsync(pageSize, page, cancellationToken);
}

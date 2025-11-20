using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Domain.Repositories.Patients;

namespace NeuronaLabs.Application.GraphQL.Queries.Patients;

public class PatientQuery
{
    public Task<PagedType<GetAllPatientsType>> GetAll(
        [Service] IPatientRepository patientRepository,
        int page = 1,
        int pageSize = 50,
        CancellationToken cancellationToken = default
    ) => patientRepository.GetAllPatientsAsync(pageSize, page, cancellationToken);

    public Task<GetPatientDetailInfoType> GetPatientDetails(
        Guid patientId,
        [Service] IPatientRepository patientRepository,
        CancellationToken cancellationToken
    ) => patientRepository.GetPatientDetailInfoAsync(patientId, cancellationToken);
}

using NeuronaLabs.Application.ApplicationServices.Patients;
using NeuronaLabs.Application.GraphQL.Types;

namespace NeuronaLabs.Application.GraphQL.Queries.Patients;

public class PatientQuery
{
    public Task<PagedType<GetAllPatientsType>> GetAll(
        [Service] IPatientService patientService,
        int page = 1,
        int pageSize = 50,
        CancellationToken cancellationToken = default
    ) => patientService.GetAllPatientsAsync(pageSize, page, cancellationToken);

    public Task<GetPatientDetailInfoType> GetPatientDetails(
        Guid patientId,
        [Service] IPatientService patientService,
        CancellationToken cancellationToken
    ) => patientService.GetPatientDetailInfoAsync(patientId, cancellationToken);
}

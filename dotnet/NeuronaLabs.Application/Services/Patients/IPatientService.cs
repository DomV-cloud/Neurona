using NeuronaLabs.Application.GraphQL.Types;

namespace NeuronaLabs.Application.ApplicationServices.Patients;

public interface IPatientService
{
    Task<PagedType<GetAllPatientsType>> GetAllPatientsAsync(
        int pageSize,
        int page,
        CancellationToken cancellationToken
    );

    Task<GetPatientDetailInfoType> GetPatientDetailInfoAsync(
        Guid patientID,
        CancellationToken cancellationToken
    );
}

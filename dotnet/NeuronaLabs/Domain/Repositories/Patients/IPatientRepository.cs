using NeuronaLabs.Application.DTOs.Responses;

namespace NeuronaLabs.Domain.Repositories.Patients;

public interface IPatientRepository
{
    Task<Patient?> GetPatientByEmailAsync(string email, CancellationToken cancellationToken);
    Task<PagedType<GetAllPatientsType>> GetAllPatientsAsync(
        int pageSize,
        int page,
        CancellationToken cancellationToken
    );
    Task<GetPatientDetailInfoType> GetPatientDetailInfoAsync(
        Guid patientID,
        CancellationToken cancellationToken
    );
    Task<Patient> CreatePatientAsync(Patient patient, CancellationToken cancellationToken);
}

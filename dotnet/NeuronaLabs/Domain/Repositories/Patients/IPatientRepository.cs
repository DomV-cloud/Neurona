using NeuronaLabs.Application.DTOs.Responses;

namespace NeuronaLabs.Domain.Repositories.Patients;

public interface IPatientRepository
{
    Task<Patient?> GetPatientByEmailAsync(string email, CancellationToken cancellationToken);
    Task<PagedResponse<GetAllPatientsResponse>> GetAllPatientsAsync(
        int pageSize,
        int page,
        CancellationToken cancellationToken
    );
    Task<GetPatientDetailInfoResponse> GetPatientDetailInfoAsync(
        Guid patientID,
        CancellationToken cancellationToken
    );
    Task<Patient> CreatePatientAsync(Patient patient, CancellationToken cancellationToken);
}

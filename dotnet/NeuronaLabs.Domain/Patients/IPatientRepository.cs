namespace NeuronaLabs.Domain.Patients;

public interface IPatientRepository
{
    Task<Patient?> GetPatientByEmailAsync(string email, CancellationToken cancellationToken);
    Task<Patient> CreatePatientAsync(Patient patient, CancellationToken cancellationToken);
    IOrderedQueryable<Patient> GetPatientsQuery();
    IQueryable<Patient?> GetPatientByIDAsync(Guid patientID);
}

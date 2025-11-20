namespace NeuronaLabs.Domain.Diagnoses;

public interface IDiagnosisRepository
{
    Task<Diagnosis?> GetByPatientAndIdAsync(
        Guid patientId,
        Guid diagnosisId,
        CancellationToken cancellationToken
    );
    Task<Diagnosis> AddDiagnosisAsync(Diagnosis diagnosis, CancellationToken cancellationToken);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

namespace NeuronaLabs.Application.DTOs.Requests
{
    public record CreateDiagnosisRecord(Guid PatientId, string DiagnosisText, string Notes);
}

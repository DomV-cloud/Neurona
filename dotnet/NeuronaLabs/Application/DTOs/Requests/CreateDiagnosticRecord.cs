namespace NeuronaLabs.Application.DTOs.Requests
{
    public record CreateDiagnosticRecord(Guid PatientId, string DiagnosisText, string Notes);
}

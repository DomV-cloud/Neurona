namespace NeuronaLabs.Application.DTOs.Requests;

public record UpdatePatientDiagnosisRequest(
    Guid PatientID,
    Guid DiagnosisID,
    string? DiagnosisText,
    string? Notes
);

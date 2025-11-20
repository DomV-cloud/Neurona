namespace NeuronaLabs.Application.DTOs.Requests;

public record UpdatePatientDiagnoseRequest(
    Guid PatientID,
    Guid DiagnoseID,
    string? DiagnosisText,
    string? Notes
);

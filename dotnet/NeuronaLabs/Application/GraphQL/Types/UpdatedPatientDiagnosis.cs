namespace NeuronaLabs.Application.DTOs.Responses;

public record UpdatedPatientDiagnosis(
    Guid? PatientID,
    Guid? DiagnosisID,
    string? DiagnosisText,
    string? Notes,
    DateTimeOffset? UpdatedAt
);

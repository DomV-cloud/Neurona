namespace NeuronaLabs.Application.DTOs.Responses;

public record UpdatedPatientDiagnosisType(
    Guid? PatientID,
    Guid? DiagnosisID,
    string? DiagnosisText,
    string? Notes,
    DateTimeOffset? UpdatedAt
);

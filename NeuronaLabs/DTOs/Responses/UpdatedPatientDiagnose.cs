namespace NeuronaLabs.DTOs.Responses;

public record UpdatedPatientDiagnose(Guid? PatientID, Guid? DiagnosticID, string? DiagnosisText, string? Notes);

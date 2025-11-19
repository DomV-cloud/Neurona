namespace NeuronaLabs.DTOs.Responses;

public record DiagnosticRecordResponse(Guid ID, string DiagnosisText, string? Notes, DateTime DateTime);

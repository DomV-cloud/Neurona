namespace NeuronaLabs.DTOs.Responses;

public record DiagnosticRecordResponse(
    Guid ID,
    string DiagnosisText,
    string? Notes,
    DateTimeOffset CreatedAt,
    DateTimeOffset? UpdatedAt
);

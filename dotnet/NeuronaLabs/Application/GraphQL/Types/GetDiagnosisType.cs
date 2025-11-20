namespace NeuronaLabs.Application.DTOs.Responses;

public record GetDiagnosisType(
    Guid ID,
    string DiagnosisText,
    string? Notes,
    DateTimeOffset CreatedAt,
    DateTimeOffset? UpdatedAt
);

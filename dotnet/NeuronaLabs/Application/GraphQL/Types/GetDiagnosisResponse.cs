namespace NeuronaLabs.Application.DTOs.Responses;

public record GetDiagnosisResponse(
    Guid ID,
    string DiagnosisText,
    string? Notes,
    DateTimeOffset CreatedAt,
    DateTimeOffset? UpdatedAt
);

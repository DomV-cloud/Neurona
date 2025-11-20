namespace NeuronaLabs.Application.GraphQL.Types;

public record GetDiagnosisType(
    Guid ID,
    string DiagnosisText,
    string? Notes,
    DateTimeOffset CreatedAt,
    DateTimeOffset? UpdatedAt
);

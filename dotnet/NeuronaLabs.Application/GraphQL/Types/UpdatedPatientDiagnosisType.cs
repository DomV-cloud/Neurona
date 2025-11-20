namespace NeuronaLabs.Application.GraphQL.Types;

public record UpdatedPatientDiagnosisType(
    Guid? PatientID,
    Guid? DiagnosisID,
    string? DiagnosisText,
    string? Notes,
    DateTimeOffset? UpdatedAt
);

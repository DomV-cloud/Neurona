namespace NeuronaLabs.Application.GraphQL.Inputs;

public record UpdatePatientDiagnosisInput(
    Guid PatientID,
    Guid DiagnosisID,
    string? DiagnosisText,
    string? Notes
);

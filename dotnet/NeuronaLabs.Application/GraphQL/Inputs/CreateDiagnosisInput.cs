namespace NeuronaLabs.Application.GraphQL.Inputs;

public record CreateDiagnosisInput(Guid PatientID, string DiagnosisText, string Notes);

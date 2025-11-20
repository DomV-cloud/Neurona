namespace NeuronaLabs.Application.GraphQL.Types;

public record CreatedPatientDiagnosisType(Guid PatientID, string Diagnosis, string? Notes);

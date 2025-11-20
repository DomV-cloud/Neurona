namespace NeuronaLabs.Application.GraphQL.Types;

public record GetAllPatientsType(
    Guid PatientID,
    string FirstName,
    string LastName,
    int Age,
    GetDiagnosisType? LastDiagnosis
);

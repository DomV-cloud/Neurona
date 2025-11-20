namespace NeuronaLabs.Application.DTOs.Responses;

public record GetAllPatientsType(
    Guid PatientID,
    string FirstName,
    string LastName,
    int Age,
    GetDiagnosisType? LastDiagnosis
);

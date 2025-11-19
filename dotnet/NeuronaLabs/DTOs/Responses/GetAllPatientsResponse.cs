namespace NeuronaLabs.DTOs.Responses;

public record GetAllPatientsResponse(
    Guid PatientID,
    string FirstName,
    string LastName,
    int Age,
    DiagnosticRecordResponse? LastDiagnosticRecord
);

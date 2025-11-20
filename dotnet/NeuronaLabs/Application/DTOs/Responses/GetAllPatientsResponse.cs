namespace NeuronaLabs.Application.DTOs.Responses;

public record GetAllPatientsResponse(
    Guid PatientID,
    string FirstName,
    string LastName,
    int Age,
    DiagnosticRecordResponse? LastDiagnosticRecord
);

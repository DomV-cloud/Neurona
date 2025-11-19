namespace NeuronaLabs.DTOs.Responses;

public record GetPatientDetailInfoResponse(
    string FirstName,
    string LastName,
    string Email,
    int Age,
    List<DiagnosticRecordResponse> DiagnosticRecords
);

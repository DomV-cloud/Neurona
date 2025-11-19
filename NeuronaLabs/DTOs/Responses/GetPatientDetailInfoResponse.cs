namespace NeuronaLabs.DTOs.Responses;

public record GetPatientDetailInfoResponse(Guid ID, string FirstName, string LastName, string Email, int Age, DiagnosticRecordResponse? LastDiagnosticRecord, List<DiagnosticRecordResponse> DiagnosticRecords);
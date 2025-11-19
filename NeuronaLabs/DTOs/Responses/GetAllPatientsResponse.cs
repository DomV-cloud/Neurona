using NeuronaLabs.Domain;

namespace NeuronaLabs.DTOs.Responses;

public record GetAllPatientsResponse(Guid ID, string FirstName, string LastName, int Age, DiagnosticRecordResponse? LastDiagnosticRecord);

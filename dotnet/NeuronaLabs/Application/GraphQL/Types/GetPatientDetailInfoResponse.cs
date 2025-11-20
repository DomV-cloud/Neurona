namespace NeuronaLabs.Application.DTOs.Responses;

public record GetPatientDetailInfoResponse(
    string FirstName,
    string LastName,
    string Email,
    int Age,
    List<GetDiagnosisResponse> Diagnoses
);

namespace NeuronaLabs.Application.DTOs.Responses;

public record GetPatientDetailInfoType(
    string FirstName,
    string LastName,
    string Email,
    int Age,
    List<GetDiagnosisType> Diagnoses
);

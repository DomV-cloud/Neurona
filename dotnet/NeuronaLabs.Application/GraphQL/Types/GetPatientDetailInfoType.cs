namespace NeuronaLabs.Application.GraphQL.Types;

public record GetPatientDetailInfoType(
    string FirstName,
    string LastName,
    string Email,
    int Age,
    List<GetDiagnosisType> Diagnoses
);

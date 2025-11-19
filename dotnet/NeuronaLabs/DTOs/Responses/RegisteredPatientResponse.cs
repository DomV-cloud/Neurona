namespace NeuronaLabs.DTOs.Responses;

public record RegisteredPatientResponse(
    string FirstName,
    string LastName,
    string Email,
    string Token
);

namespace NeuronaLabs.Application.DTOs.Responses;

public record RegisteredPatientResponse(
    string FirstName,
    string LastName,
    string Email,
    string Token
);

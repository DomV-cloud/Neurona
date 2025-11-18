namespace NeuronaLabs.DTOs.Responses;

public record GetLoginResponse(string FirstName, string LastName, string Email, string Token);
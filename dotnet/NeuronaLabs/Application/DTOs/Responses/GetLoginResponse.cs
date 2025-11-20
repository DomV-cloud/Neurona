namespace NeuronaLabs.Application.DTOs.Responses;

public record GetLoginResponse(string FirstName, string LastName, string Email, string Token);

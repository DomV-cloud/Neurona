namespace NeuronaLabs.DTOs.Requests;

public record RegisterPatientRequest(string FirstName, string LastName, string Email, string Password, int Age);
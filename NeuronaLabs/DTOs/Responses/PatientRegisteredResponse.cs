namespace NeuronaLabs.DTOs.Responses;

public record PatientRegisteredResponse(Guid ID, string FirstName, string LastName, string Email);
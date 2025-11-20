namespace NeuronaLabs.Application.DTOs.Requests
{
    public record CreatePatientRequest(
        string FirstName,
        string LastName,
        string Email,
        string Password,
        int Age
    );
}

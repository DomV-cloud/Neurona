namespace NeuronaLabs.Application.GraphQL.Inputs;

public record CreatePatientInput(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    int Age
);

namespace NeuronaLabs.Application.GraphQL.Inputs;

public record RegisterPatientInput(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    int Age
);

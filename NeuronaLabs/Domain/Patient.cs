namespace NeuronaLabs.Domain;

public class Patient
{
    public Guid ID { get; set; } = Guid.NewGuid();

    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; } // setter for lowercase? AND Index?
    public required int Age { get; set; }
    public string? PasswordHash { get; set; } // setter private?

    public List<Diagnose>? Diagnostics { get; set; } = [];
}

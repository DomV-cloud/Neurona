namespace NeuronaLabs.Domain;

public class Patient(string firstName, string lastName, string email, int age)
{
    public Guid ID { get; set; } = Guid.NewGuid();

    public string FirstName { get; private set; } = firstName;
    public string LastName { get; private set; } = lastName;
    public string Email { get; private set; } = email;
    public int Age { get; private set; } = age;

    public string PasswordHash { get; private set; } = null!;

    public List<Diagnosis>? Diagnoses { get; private set; } = [];

    public void SetPasswordHash(string passwordHash)
    {
        if (string.IsNullOrWhiteSpace(passwordHash))
            throw new ArgumentException("Password hash cannot be empty.", nameof(passwordHash));

        PasswordHash = passwordHash;
    }
}

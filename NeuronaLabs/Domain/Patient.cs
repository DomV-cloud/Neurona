namespace NeuronaLabs.Domain;

public class Patient
{
    public Guid ID { get; set; } = Guid.NewGuid();

    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required int Age { get; set; }
    public required string PasswordHash { get; set; }

    public DiagnosticRecord? LastDiagnosis { get; set; }
    public Guid? LastDiagnosisID { get; set; }

    public List<DiagnosticRecord>? Diagnostics { get; set; } = [];
}

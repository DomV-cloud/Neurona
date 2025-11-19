namespace NeuronaLabs.Domain;

public class Patient
{
    public Guid ID { get; set; } = Guid.NewGuid(); // TODO: sett as private

    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public string? PasswordHash { get; set; }
    public required int Age { get; set; }

    public DiagnosticRecord? LastDiagnosis { get; set; }
    public Guid? LastDiagnosisID { get; set; }

    public List<DiagnosticRecord> DiagnosticRecords { get; set; } = [];
}

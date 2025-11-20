namespace NeuronaLabs.Domain;

public class DiagnosticRecord
{
    public Guid ID { get; set; } = Guid.NewGuid();

    public Guid PatientID { get; set; }
    public Patient Patient { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; set; }

    public string DiagnosisText { get; set; } = null!;

    public string? Notes { get; set; }
}

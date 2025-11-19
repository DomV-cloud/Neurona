namespace NeuronaLabs.Domain;

public class DiagnosticRecord
{
    public Guid ID { get; set; } = Guid.NewGuid();

    public Guid PatientID { get; set; }
    public Patient Patient { get; set; } = null!;

    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;

    public string DiagnosisText { get; set; } = null!;

    public string? Notes { get; set; }
}

namespace NeuronaLabs.Domain;

public class DiagnosticRecord
{
    public Guid ID { get; set; } = Guid.NewGuid();

    public Guid PatientId { get; set; }
    public Patient Patient { get; set; } = null!;

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public string DiagnosisText { get; set; } = null!;

    public string? Notes { get; set; }
}

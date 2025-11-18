namespace NeuronaLabs.Domain;

public class Patient
{
    public Guid ID { get; private set; } = Guid.NewGuid();

    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }

    public DiagnosticRecord? LastDiagnosis { get; set; }
    public Guid? LastDiagnosisID { get; set; }

    public List<DiagnosticRecord> DiagnosticRecords { get; set; } = [];
}

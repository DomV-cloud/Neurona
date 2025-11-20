using NeuronaLabs.Domain.Patients;

namespace NeuronaLabs.Domain.Diagnoses;

public class Diagnosis(Guid patientID, string diagnosisText, string? notes)
{
    public Guid ID { get; set; } = Guid.NewGuid();

    public Guid PatientID { get; private set; } = patientID;
    public Patient Patient { get; private set; } = null!;

    public DateTimeOffset CreatedAt { get; private set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    public string DiagnosisText { get; private set; } = diagnosisText;

    public string? Notes { get; private set; } = notes;

    public void UpdateDiagnosis(string newDiagnosis, string? newNotes = null)
    {
        SetDiagnosisText(newDiagnosis);
        if (newNotes is not null)
        {
            SetNotes(newNotes);
        }

        UpdatedAt = DateTimeOffset.UtcNow;
    }

    public void SetDiagnosisText(string diagnosisText)
    {
        if (string.IsNullOrWhiteSpace(diagnosisText))
            throw new ArgumentException("Diagnosis text cannot be empty.", nameof(diagnosisText));

        DiagnosisText = diagnosisText;
    }

    public void SetNotes(string? notes)
    {
        Notes = notes;
    }

    public void SetUpdatedAt()
    {
        UpdatedAt = DateTimeOffset.UtcNow;
    }
}

namespace NeuronaLabs.DTOs.Requests
{
    public record CreatePatientRequest(
        string FirstName,
        string LastName,
        string Email,
        string Password,
        int Age,
        CreateDiagnosticRecord? Diagnostic
    );

    public record CreateDiagnosticRecord(string DiagnosisText, string Notes);
}

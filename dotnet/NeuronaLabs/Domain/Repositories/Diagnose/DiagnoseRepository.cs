using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Database;
using NeuronaLabs.DTOs.Requests;
using NeuronaLabs.DTOs.Responses;

namespace NeuronaLabs.Domain.Repositories.Diagnose;

public class DiagnoseRepository(NeuronaLabsDbContext dbContext) : IDiagnoseRepository
{
    private readonly NeuronaLabsDbContext _dbContext = dbContext;

    public async Task<UpdatedPatientDiagnose> UpdateDiagnose(
        UpdatePatientDiagnoseRequest request,
        CancellationToken cancellationToken
    )
    {
        var diagnosticToUpdate =
            await _dbContext.DiagnosticRecords.FirstOrDefaultAsync(
                d => d.PatientID == request.PatientID && d.ID == request.DiagnoseID,
                cancellationToken
            )
            ?? throw new InvalidOperationException(
                $"Patient with ID '{request.PatientID}' or Diagnosis with ID '{request.DiagnoseID}' was not found."
            );

        diagnosticToUpdate.DiagnosisText = request.DiagnosisText;
        diagnosticToUpdate.Notes = request.Notes;
        // TODO: Add property for updated timestamp if needed

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new UpdatedPatientDiagnose(
            diagnosticToUpdate.PatientID,
            diagnosticToUpdate.ID,
            diagnosticToUpdate.DiagnosisText,
            diagnosticToUpdate.Notes
        );
    }
}

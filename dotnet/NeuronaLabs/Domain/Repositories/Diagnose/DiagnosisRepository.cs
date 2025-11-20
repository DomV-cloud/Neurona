using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Infrastructure.Database;

namespace NeuronaLabs.Domain.Repositories.Diagnosis;

public class DiagnosisRepository(NeuronaLabsDbContext dbContext) : IDiagnosisRepository
{
    private readonly NeuronaLabsDbContext _dbContext = dbContext;

    public async Task<UpdatedPatientDiagnosis> UpdateDiagnosis(
        UpdatePatientDiagnosisRequest request,
        CancellationToken cancellationToken
    )
    {
        var diagnosisToUpdate =
            await _dbContext.Diagnoses.FirstOrDefaultAsync(
                d => d.PatientID == request.PatientID && d.ID == request.DiagnosisID,
                cancellationToken
            )
            ?? throw new InvalidOperationException(
                $"Patient with ID '{request.PatientID}' or Diagnosis with ID '{request.DiagnosisID}' was not found."
            );

        diagnosisToUpdate.UpdateDiagnosis(request.DiagnosisText, request.Notes);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new UpdatedPatientDiagnosis(
            diagnosisToUpdate.PatientID,
            diagnosisToUpdate.ID,
            diagnosisToUpdate.DiagnosisText,
            diagnosisToUpdate.Notes,
            diagnosisToUpdate.UpdatedAt
        );
    }
}

using Azure.Core;
using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Application.DTOs.Requests;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Application.GraphQL.Types;
using NeuronaLabs.Infrastructure.Database;

namespace NeuronaLabs.Domain.Repositories.Diagnoses;

public class DiagnosisRepository(NeuronaLabsDbContext dbContext) : IDiagnosisRepository
{
    private readonly NeuronaLabsDbContext _dbContext = dbContext;

    public async Task<Diagnosis> AddDiagnosisAsync(
        Diagnosis diagnosis,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(diagnosis);

        await _dbContext.Diagnoses.AddAsync(diagnosis, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return diagnosis;
    }

    public async Task<Diagnosis?> GetByPatientAndIdAsync(
        Guid patientId,
        Guid diagnosisId,
        CancellationToken cancellationToken
    )
    {
        var diagnosisToUpdate =
            await _dbContext.Diagnoses.FirstOrDefaultAsync(
                d => d.PatientID == patientId && d.ID == diagnosisId,
                cancellationToken
            )
            ?? throw new InvalidOperationException(
                $"Patient with ID '{patientId}' or Diagnosis with ID '{diagnosisId}' was not found."
            );

        return diagnosisToUpdate;
    }
}

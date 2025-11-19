using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Database;
using NeuronaLabs.DTOs.Responses;

namespace NeuronaLabs.Domain.Repositories.Patients;

public class PatientRepository : IPatientRepository
{
    private readonly NeuronaLabsDbContext _dbContext;

    public PatientRepository(NeuronaLabsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagedResponse<GetAllPatientsResponse>> GetAllPatientsAsync(int pageSize, int page, CancellationToken cancellationToken)
    {
        var query = _dbContext.Patients
         .AsNoTracking()
         .OrderBy(p => p.LastName)
         .ThenBy(p => p.FirstName);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new GetAllPatientsResponse(
                p.ID,
                p.FirstName,
                p.LastName,
                p.Age,
                p.LastDiagnosis == null
                    ? null
                    : new DiagnosticRecordResponse(
                        p.LastDiagnosis.ID,
                        p.LastDiagnosis.DiagnosisText,
                        p.LastDiagnosis.Notes,
                        p.LastDiagnosis.Timestamp
                    )
            ))
            .ToListAsync(cancellationToken);

        return new PagedResponse<GetAllPatientsResponse>(
            items,
            page,
            pageSize,
            totalCount
        );
    }

    public async Task<Patient?> GetPatientByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await _dbContext.Patients
            .AsNoTracking()
            .Where(p => p.Email == email)
            .FirstOrDefaultAsync(cancellationToken);
    }
}

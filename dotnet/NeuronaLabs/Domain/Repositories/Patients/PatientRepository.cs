using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Application.DTOs.Responses;
using NeuronaLabs.Infrastructure.Database;

namespace NeuronaLabs.Domain.Repositories.Patients;

public class PatientRepository(NeuronaLabsDbContext dbContext) : IPatientRepository
{
    private readonly NeuronaLabsDbContext _dbContext = dbContext;

    public async Task<Patient> CreatePatientAsync(
        Patient patient,
        CancellationToken cancellationToken
    )
    {
        await _dbContext.Patients.AddAsync(patient, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return patient;
    }

    public async Task<PagedType<GetAllPatientsType>> GetAllPatientsAsync(
        int pageSize,
        int page,
        CancellationToken cancellationToken
    )
    {
        var query = _dbContext
            .Patients.AsNoTracking()
            .OrderBy(p => p.LastName)
            .ThenBy(p => p.FirstName);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new GetAllPatientsType(
                p.ID,
                p.FirstName,
                p.LastName,
                p.Age,
                p.Diagnoses.OrderByDescending(dr => dr.CreatedAt)
                    .Select(dr => new GetDiagnosisType(
                        dr.ID,
                        dr.DiagnosisText,
                        dr.Notes,
                        dr.CreatedAt,
                        dr.UpdatedAt
                    ))
                    .FirstOrDefault()
            ))
            .ToListAsync(cancellationToken);

        return new PagedType<GetAllPatientsType>(items, page, pageSize, totalCount);
    }

    public async Task<Patient?> GetPatientByEmailAsync(
        string email,
        CancellationToken cancellationToken
    )
    {
        return await _dbContext
            .Patients.AsNoTracking()
            .Where(p => p.Email == email)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<GetPatientDetailInfoType> GetPatientDetailInfoAsync(
        Guid patientID,
        CancellationToken cancellationToken
    )
    {
        var patientDetail =
            await _dbContext
                .Patients.AsNoTracking()
                .Where(p => p.ID == patientID)
                .Select(p => new GetPatientDetailInfoType(
                    p.FirstName,
                    p.LastName,
                    p.Email,
                    p.Age,
                    p.Diagnoses.Select(dr => new GetDiagnosisType(
                            dr.ID,
                            dr.DiagnosisText,
                            dr.Notes,
                            dr.CreatedAt,
                            dr.UpdatedAt
                        ))
                        .ToList()
                ))
                .FirstOrDefaultAsync(cancellationToken)
            ?? throw new InvalidOperationException($"Patient with ID '{patientID}' was not found.");

        return patientDetail;
    }
}

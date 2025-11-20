using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Domain.Patients;
using NeuronaLabs.Infrastructure.Database;

namespace NeuronaLabs.Infrastructure.Services.Patients;

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

    public IOrderedQueryable<Patient> GetPatientsQuery()
    {
        return _dbContext.Patients.AsNoTracking().OrderBy(p => p.LastName).ThenBy(p => p.FirstName);
    }

    public async Task<Patient?> GetPatientByEmailAsync(
        string email,
        CancellationToken cancellationToken
    )
    {
        return await _dbContext
            .Patients.AsNoTracking()
            .FirstOrDefaultAsync(p => p.Email == email, cancellationToken);
    }

    public IQueryable<Patient?> GetPatientByIDAsync(Guid patientID)
    {
        return _dbContext.Patients.AsNoTracking().Where(p => p.ID == patientID);
    }
}

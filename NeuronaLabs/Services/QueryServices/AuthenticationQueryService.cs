using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Database;
using NeuronaLabs.Domain;
using NeuronaLabs.DTOs.Responses;

namespace NeuronaLabs.Services.QueryServices;

public class AuthenticationQueryService(NeuronaLabsDbContext context)
{
    public async Task<Patient?> GetPatientByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await context.Patients
            .AsNoTracking()
            .Where(p => p.Email == email)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<bool> IsEmailRegisteredAsync(string email, CancellationToken cancellationToken)
    {
        return await context.Patients
            .AsNoTracking()
            .AnyAsync(p => p.Email == email, cancellationToken);
    }
}
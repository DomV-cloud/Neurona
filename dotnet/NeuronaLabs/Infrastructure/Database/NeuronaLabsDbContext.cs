using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Domain;

namespace NeuronaLabs.Infrastructure.Database;

public class NeuronaLabsDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<DiagnosticRecord> DiagnosticRecords => Set<DiagnosticRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Patient>()
            .HasMany(p => p.Diagnostics)
            .WithOne(dr => dr.Patient)
            .HasForeignKey(dr => dr.PatientID)
            .OnDelete(DeleteBehavior.Cascade);

        var patientId = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var diagnosis1Id = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var diagnosis2Id = Guid.Parse("33333333-3333-3333-3333-333333333333");

        var diag1Timestamp = DateTimeOffset.Parse("2024-01-10T09:00:00Z");
        var diag2Timestamp = DateTimeOffset.Parse("2024-01-15T14:30:00Z");

        modelBuilder
            .Entity<Patient>()
            .HasData(
                new
                {
                    ID = patientId,
                    FirstName = "Alice",
                    LastName = "Novak",
                    Email = "alice.novak@example.com",
                    Age = 34,
                    PasswordHash = "$2y$10$mZANmx707zBLu2aBdDqeJeYzGvnO2Og3IoxgApJQbe.UuFxmrVoz2", //Heslo123
                }
            );

        modelBuilder
            .Entity<DiagnosticRecord>()
            .HasData(
                new
                {
                    ID = diagnosis1Id,
                    PatientID = patientId,
                    CreatedAt = diag1Timestamp,
                    DiagnosisText = "Seasonal Allergy",
                    Notes = "Prescribed antihistamines",
                },
                new
                {
                    ID = diagnosis2Id,
                    PatientID = patientId,
                    CreatedAt = diag2Timestamp,
                    DiagnosisText = "Sinus Infection",
                    Notes = "Recommended antibiotics",
                }
            );
    }
}

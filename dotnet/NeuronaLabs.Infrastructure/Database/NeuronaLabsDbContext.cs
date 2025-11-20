using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Domain.Diagnoses;
using NeuronaLabs.Domain.Patients;

namespace NeuronaLabs.Infrastructure.Database;

public class NeuronaLabsDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Diagnosis> Diagnoses => Set<Diagnosis>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Patient>()
            .HasMany(p => p.Diagnoses)
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
                    FirstName = "Kamila",
                    LastName = "Dvorak",
                    Email = "kamila.dvorak@example.com",
                    Age = 34,
                    PasswordHash = "$2y$10$mZANmx707zBLu2aBdDqeJeYzGvnO2Og3IoxgApJQbe.UuFxmrVoz2", //Heslo123
                }
            );

        modelBuilder
            .Entity<Diagnosis>()
            .HasData(
                new
                {
                    ID = diagnosis1Id,
                    PatientID = patientId,
                    CreatedAt = diag1Timestamp,
                    UpdatedAt = diag1Timestamp,
                    DiagnosisText = "Mild cognitive impairment (MCI)",
                    Notes = "Pacient si stěžuje na zhoršení krátkodobé paměti za posledních 6 měsíců. MMSE 26/30. Doporučeno MRI mozku a kognitivní trénink.",
                },
                new
                {
                    ID = diagnosis2Id,
                    PatientID = patientId,
                    CreatedAt = diag2Timestamp,
                    UpdatedAt = diag2Timestamp,
                    DiagnosisText = "Early Alzheimer’s disease – suspicion",
                    Notes = "Kontrola po 3 měsících: MMSE 24/30. MRI mozku ukazuje mírnou atrofii hippocampu bilaterálně. Nasazen donepezil 5 mg, kontrola za 3 měsíce.",
                }
            );
    }
}

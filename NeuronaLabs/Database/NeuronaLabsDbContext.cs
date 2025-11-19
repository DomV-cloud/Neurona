using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Domain;
using System;

namespace NeuronaLabs.Database;

public class NeuronaLabsDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<DiagnosticRecord> DiagnosticRecords => Set<DiagnosticRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Patient>()
            .HasMany(p => p.Diagnostics)
            .WithOne(dr => dr.Patient)
            .HasForeignKey(dr => dr.PatientId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Patient>()
            .HasOne(p => p.LastDiagnosis)
            .WithMany()
            .HasForeignKey(p => p.LastDiagnosisID)
            .OnDelete(DeleteBehavior.NoAction);

        var patientId = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var diagnosis1Id = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var diagnosis2Id = Guid.Parse("33333333-3333-3333-3333-333333333333");

        var diag1Timestamp = DateTimeOffset.Parse("2024-01-10T09:00:00Z");
        var diag2Timestamp = DateTimeOffset.Parse("2024-01-15T14:30:00Z");

        modelBuilder.Entity<Patient>().HasData(new Patient
        {
            ID = patientId,
            FirstName = "Alice",
            LastName = "Novak",
            Email = "alice.novak@example.com",
            Age = 34,
            PasswordHash = "$2y$10$mZANmx707zBLu2aBdDqeJeYzGvnO2Og3IoxgApJQbe.UuFxmrVoz2", // Heslo123
        });

        modelBuilder.Entity<DiagnosticRecord>().HasData(
            new DiagnosticRecord
            {
                ID = diagnosis1Id,
                PatientId = patientId,
                Timestamp = diag1Timestamp,
                DiagnosisText = "Seasonal Allergy",
                Notes = "Prescribed antihistamines"
            },
            new DiagnosticRecord
            {
                ID = diagnosis2Id,
                PatientId = patientId,
                Timestamp = diag2Timestamp,
                DiagnosisText = "Sinus Infection",
                Notes = "Recommended antibiotics"
            }
        );
    }
}

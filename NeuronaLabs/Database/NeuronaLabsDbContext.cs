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
            .HasMany(p => p.DiagnosticRecords)
            .WithOne(dr => dr.Patient)
            .HasForeignKey(dr => dr.PatientId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Patient>()
            .HasOne(p => p.LastDiagnosis)
            .WithMany()
            .HasForeignKey(p => p.LastDiagnosisID)
            .OnDelete(DeleteBehavior.NoAction);

        // Seed data
        var patientId = Guid.Parse("8707d7e0-38ac-4fcb-aad5-6eb8ef986d45");
        var diagnosisId = Guid.Parse("c56a4180-65aa-42ec-a945-5fd21dec0538");
        var seedTimestamp = DateTime.Parse("2024-01-01T00:00:00Z");

        modelBuilder.Entity<Patient>()
            .HasData(new Patient
            {
                ID = patientId,
                FirstName = "John",
                LastName = "Doe",
                Age = 30,
                Email = "john.doe@example.com",
                PasswordHash = "$2y$10$pXLPBz7V.mSDHhm5nUp1ZeSvZYz7l3Ho61DJfoZsvlDXqhIKgDT5e", // Heslo123
                LastDiagnosisID = diagnosisId
            });

        modelBuilder.Entity<DiagnosticRecord>()
            .HasData(new DiagnosticRecord
            {
                ID = diagnosisId,
                PatientId = patientId,
                Timestamp = seedTimestamp,
                DiagnosisText = "Initial seeded diagnosis",
                Notes = "Seed data"
            });
    }
}

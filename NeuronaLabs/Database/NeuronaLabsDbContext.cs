using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Domain;

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
    }
}

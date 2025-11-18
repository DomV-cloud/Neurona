using Microsoft.AspNetCore.Identity;
using NeuronaLabs.Database;
using NeuronaLabs.Domain;
using NeuronaLabs.DTOs.Requests;
using NeuronaLabs.DTOs.Responses;

namespace NeuronaLabs.Services;

public class AuthenticationMutationService(
    NeuronaLabsDbContext context, 
    IPasswordHasher<Patient> passwordHasher
    )
{
    private readonly NeuronaLabsDbContext _context = context;
    private readonly IPasswordHasher<Patient> _passwordHasher = passwordHasher;

    public async Task<PatientRegisteredResponse> RegisterPatientAsync(
        RegisterPatientRequest request,
        CancellationToken cancellationToken = default)
    {
        var patient = new Patient
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Age = request.Age
        };

        patient.PasswordHash = _passwordHasher.HashPassword(patient, request.Password);

        await _context.Patients.AddAsync(patient, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new PatientRegisteredResponse(
            patient.ID,
            patient.FirstName,
            patient.LastName,
            patient.Email
        );
    }
}


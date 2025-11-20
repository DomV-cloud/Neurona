using Microsoft.AspNetCore.Identity;
using NeuronaLabs.Application.DomainServices.Diagnoses;
using NeuronaLabs.Authentication.JWT;
using NeuronaLabs.Domain;
using NeuronaLabs.Domain.Repositories.Diagnoses;
using NeuronaLabs.Domain.Repositories.Patients;
using NeuronaLabs.Infrastructure.Services.Diagnoses;
using NeuronaLabs.Services.Authentication;

namespace NeuronaLabs;

public static class DependencyInjection
{
    public static IServiceCollection AddNeuronaLabsServices(this IServiceCollection services)
    {
        // Register services here
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IPasswordHasher<Patient>, PasswordHasher<Patient>>();

        services.AddScoped<IPatientRepository, PatientRepository>();
        services.AddScoped<IDiagnosisRepository, DiagnosisRepository>();

        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

        return services;
    }

    public static IServiceCollection AddCustomOptions(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.Configure<JwtTokenSettings>(configuration.GetSection(nameof(JwtTokenSettings)));

        return services;
    }

    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IDiagnosisService, DiagnosisService>();

        return services;
    }
}

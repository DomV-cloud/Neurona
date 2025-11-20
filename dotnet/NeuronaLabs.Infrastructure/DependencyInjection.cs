using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NeuronaLabs.Application.ApplicationServices.Diagnoses;
using NeuronaLabs.Application.ApplicationServices.Patients;
using NeuronaLabs.Application.Authentication.JWT;
using NeuronaLabs.Domain.Diagnoses;
using NeuronaLabs.Domain.Patients;
using NeuronaLabs.Infrastructure.Authentication.JWT;
using NeuronaLabs.Infrastructure.Services.Diagnoses;
using NeuronaLabs.Infrastructure.Services.Patients;

namespace NeuronaLabs.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddSingleton<IPasswordHasher<Patient>, PasswordHasher<Patient>>();
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

        return services.AddCustomOptions(configuration).AddNeuronaLabsServices().AddRepositories();
    }

    public static IServiceCollection AddCustomOptions(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.Configure<JwtTokenSettings>(configuration.GetSection(nameof(JwtTokenSettings)));

        return services;
    }

    public static IServiceCollection AddNeuronaLabsServices(this IServiceCollection services)
    {
        services.AddScoped<IPatientService, PatientService>();
        services.AddScoped<IDiagnosisService, DiagnosisService>();
        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IPatientRepository, PatientRepository>();
        services.AddScoped<IDiagnosisRepository, DiagnosisRepository>();
        return services;
    }
}

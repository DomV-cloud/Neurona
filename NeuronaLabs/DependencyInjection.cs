using Microsoft.AspNetCore.Identity;
using NeuronaLabs.Authentication.JWT;
using NeuronaLabs.Domain;
using NeuronaLabs.Services;
using NeuronaLabs.Services.Authentication;
using NeuronaLabs.Services.QueryServices;

namespace NeuronaLabs;

public static class DependencyInjection
{
    public static IServiceCollection AddNeuronaLabsServices(this IServiceCollection services)
    {
        // Register services here
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<AuthenticationMutationService>();
        services.AddScoped<AuthenticationQueryService>();
        services.AddScoped<IPasswordHasher<Patient>, PasswordHasher<Patient>>();

        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        return services;
    }
}

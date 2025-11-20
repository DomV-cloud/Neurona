using Microsoft.Extensions.DependencyInjection;
using NeuronaLabs.Application.Authentication;

namespace NeuronaLabs.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        return services;
    }
}

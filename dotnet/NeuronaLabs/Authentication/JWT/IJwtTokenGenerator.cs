using NeuronaLabs.Domain;

namespace NeuronaLabs.Authentication.JWT;

public interface IJwtTokenGenerator
{
    string GenerateToken(Patient patient);
}

using NeuronaLabs.Domain.Patients;

namespace NeuronaLabs.Application.Authentication.JWT;

public interface IJwtTokenGenerator
{
    string GenerateToken(Patient patient);
}

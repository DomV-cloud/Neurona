namespace NeuronaLabs.Authentication.JWT;

public class JwtTokenSettings
{
    public string SecretKey { get; init; } = null!;
    public int ExpiryMinutes { get; init; }
    public string Issuer { get; init; } = null!;
    public string Audience { get; init; } = null!;
}

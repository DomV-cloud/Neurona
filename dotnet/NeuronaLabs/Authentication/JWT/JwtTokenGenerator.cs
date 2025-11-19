using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NeuronaLabs.Domain;

namespace NeuronaLabs.Authentication.JWT;

public class JwtTokenGenerator(IOptions<JwtTokenSettings> jwtSettings) : IJwtTokenGenerator
{
    private readonly JwtTokenSettings _jwtSettings = jwtSettings.Value;

    public string GenerateToken(Patient patient)
    {
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey)),
            SecurityAlgorithms.HmacSha256
        );

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, patient.ID.ToString()),
            new Claim(JwtRegisteredClaimNames.GivenName, patient.FirstName),
            new Claim(JwtRegisteredClaimNames.FamilyName, patient.LastName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var securityToken = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
            claims: claims,
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}

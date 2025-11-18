using System.Security.Cryptography;
using System.Text;

namespace NeuronaLabs.Services.Authentication;

// https://www.reddit.com/r/dotnet/comments/1fxjgov/best_practices_for_hashing_and_verifying/
public static class PasswordHasher
{
    /// <summary>
    /// generates random characters
    /// </summary>
    /// <returns></returns>
    public static string GenerateSalt()
    {
        byte[] saltBytes = new byte[16];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(saltBytes);
        return Convert.ToBase64String(saltBytes); // salt => random numbers - counts with bytes (lately converted to string/letters)
    }

    /// <summary>
    /// generates 'Hash' and combine password and salt
    /// </summary>
    /// <param name="password"></param>
    /// <param name="salt"></param>
    /// <returns></returns>
    public static string HashPassword(string password, string salt)
    {
        var combined = salt + password; // combine salt + hash
        byte[] hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(combined)); // using hashing algorithm
        return Convert.ToBase64String(hashBytes);
    }

    public static bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
    {
        var hashOfInput = HashPassword(enteredPassword, storedSalt);
        return hashOfInput == storedHash;
    }
}

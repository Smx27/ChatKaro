using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ChatKaro.API.Data.Entities;
using ChatKaro.API.Data.Interfaces;

namespace ChatKaro.API.Services;

/// <summary>
/// Provides functionality for generating JWT tokens and refresh tokens for user authentication.
/// </summary>
public class JwtTokenService : IJwtTokenService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SymmetricSecurityKey _key;
    private readonly string? _refreshTokenSalt;

    /// <summary>
    /// Initializes a new instance of the JwtTokenService class with the specified UserManager and configuration.
    /// </summary>
    /// <param name="userManager">The UserManager used for managing user operations.</param>
    /// <param name="config">The configuration object to access application settings.</param>
    public JwtTokenService(UserManager<AppUser> userManager, IConfiguration config)
    {
        var tokenKey = config.GetValue<string>("JwtToken");
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey ?? ""));
        _refreshTokenSalt = tokenKey;
        _userManager = userManager;
    }

    /// <summary>
    /// Creates a JWT token for authentication using the specified user and claims.
    /// </summary>
    /// <param name="user">The user for whom the token is being created.</param>
    /// <param name="claims">The claims to include in the token.</param>
    /// <returns>A task that represents the asynchronous operation, containing the generated JWT token as a string.</returns>
    public async Task<string> CreateTokenAsync(AppUser user, List<Claim>? claims)
    {
        if (claims == null || claims.Count == 0)
        {
            // Adding claims
            claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new(JwtRegisteredClaimNames.UniqueName, user.UserName ?? string.Empty)
            };

            // Adding roles to claims
            if (user.Roles != null)
            {
                var roles = await _userManager.GetRolesAsync(user);
                claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
            }
        }

        var signingCredentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = signingCredentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    /// <summary>
    /// Creates a refresh token for the specified user.
    /// </summary>
    /// <param name="user">The user for whom the refresh token is being created.</param>
    /// <returns>A task that represents the asynchronous operation, containing the generated refresh token as a string.</returns>
    public async Task<string> CreateRefreshToken(AppUser user)
    {
        // Get salt from app settings
        if (string.IsNullOrEmpty(_refreshTokenSalt))
            throw new ArgumentException("Missing RefreshTokenSalt in app settings");

        // Generate random value
        var randomBytes = new byte[32]; // 32 bytes for 256-bit random value
        using (var random = RandomNumberGenerator.Create())
        {
            random.GetBytes(randomBytes);
        }

        var randomString = Convert.ToBase64String(randomBytes);

        // Combine username, salt, and random value
        var combinedString = $"{user.UserName}{_refreshTokenSalt}{randomString}";

        // Hash using SHA512
        var hashedBytes = SHA512.HashData(Encoding.UTF8.GetBytes(combinedString));
        return await Task.FromResult(Convert.ToBase64String(hashedBytes));
    }
}
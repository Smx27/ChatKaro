using System.Security.Claims;
using ChatKaro.API.Data.Entities;

namespace ChatKaro.API.Data.Interfaces;

/// <summary>
/// Defines a interface for jwt token service 
/// </summary>
public interface IJwtTokenService
{
    /// <summary>
    /// This function creates a JWT token for authentication in an API using a user's username as a
    /// claim.
    /// </summary>
    /// <param name="user">AppUser is a custom class representing a user in the application. It
    /// contains properties such as UserName, Email, Password, etc.</param>
    /// <param name="claims">Claims of the user</param>
    /// <returns>
    /// The method is returning a JWT token as a string.
    /// </returns>
    Task<string> CreateTokenAsync(AppUser user, List<Claim>? claims);

    /// <summary>
    /// This function creates a JWT refresh token for authentication in an API using a user's username as a
    /// claim.
    /// </summary>
    /// <param name="user"></param>
    /// <returns>Jwt refresh token as a string</returns>
    Task<string> CreateRefreshToken(AppUser user);
}
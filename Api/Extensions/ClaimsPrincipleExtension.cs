using System.Security.Claims;

namespace ChatKaro.API.Extensions;

/// <summary>
/// Provides extension methods for the ClaimsPrincipal class to retrieve user information from claims.
/// </summary>
public static class ClaimsPrincipleExtension
{
    /// <summary>
    /// Method to get the username from the claims principal.
    /// </summary>
    /// <param name="user">The ClaimsPrincipal from which to retrieve the username.</param>
    /// <returns>A string representing the username if found; otherwise, null.</returns>
    public static string? GetUserName(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.Name)?.Value;
    }

    /// <summary>
    /// Method to get the user ID from the claims principal.
    /// </summary>
    /// <param name="user">The ClaimsPrincipal from which to retrieve the user ID.</param>
    /// <returns>An integer representing the user ID if found; otherwise, 0.</returns>
    public static int GetUserId(this ClaimsPrincipal user)
    {
        var value = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return value != null ? int.Parse(value) : 0;
    }
}
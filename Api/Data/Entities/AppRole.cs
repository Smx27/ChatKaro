using Microsoft.AspNetCore.Identity;

namespace ChatKaro.API.Data.Entities;

/// <summary>
/// Object to represent App Role entity
/// </summary>
public class AppRole : IdentityRole<int>
{
    /// <summary>
    /// Collection of roles for a user used for many-to-many mapping
    /// </summary>
    public ICollection<UserRole>? UserRoles { get; init; }
}
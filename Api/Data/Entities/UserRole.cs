using Microsoft.AspNetCore.Identity;

namespace ChatKaro.API.Data.Entities;

/// <summary>
/// Represents the association between a user and a role in the application.
/// </summary>
public class UserRole : IdentityUserRole<int>
{
    /// <summary>
    /// Gets or sets the user associated with this role.
    /// </summary>
    public AppUser? User { get; set; }

    /// <summary>
    /// Gets or sets the role associated with this user.
    /// </summary>
    public AppRole? Role { get; set; }
}
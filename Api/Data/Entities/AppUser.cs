using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ChatKaro.API.Data.Entities;

/// <summary>
/// Represents a user in the application, extending the IdentityUser class.
/// </summary>
public class AppUser : IdentityUser<int>
{
    /// <summary>
    /// Gets or sets the first name of the user.
    /// </summary>
    [StringLength(100)]
    public required string FirstName { get; set; }

    /// <summary>
    /// Gets or sets the last name of the user.
    /// </summary>
    [StringLength(100)]
    public required string LastName { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the user's account is active.
    /// </summary>
    public bool IsActive { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the user's account is marked as deleted.
    /// </summary>
    public bool IsDeleted { get; set; }

    /// <summary>
    /// Gets or sets the collection of roles associated with the user.
    /// </summary>
    public ICollection<UserRole>? Roles { get; set; }

    /// <summary>
    /// Gets or sets the refresh token for the user.
    /// </summary>
    [StringLength(512)]
    public string? RefreshToken { get; set; }

    /// <summary>
    /// Gets or sets the expiration time of the refresh token.
    /// </summary>
    public DateTime RefreshTokenExpiryTime { get; set; }
}
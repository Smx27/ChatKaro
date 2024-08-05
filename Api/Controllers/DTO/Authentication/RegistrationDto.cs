using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ChatKaro.API.Controllers.DTO.Authentication;

/// <summary>
///  Data transfer object for registering a new user.
/// </summary>
public class RegistrationDto
{
    /// <summary>
    /// The username of the new user.
    /// </summary>
    [Required]
    [DataType(DataType.Text)]
    [DefaultValue("TestUser1")]
    public required string Username { get; set; }

    /// <summary>
    /// The password of the new user.
    /// </summary>
    [Required]
    [StringLength(8, MinimumLength = 4)]
    [DataType(DataType.Password)]
    [DefaultValue("Pa$$w0rd")]
    public required string Password { get; set; }

    /// <summary>
    /// The email address of the new user.
    /// </summary>
    [Required]
    [DataType(DataType.EmailAddress)]
    [DefaultValue("TestUser1@ChatKaro.com")]
    public required string Email { get; set; }

    /// <summary>
    /// The user's first name.
    /// </summary>
    /// <value>John</value>
    [Required]
    [DataType(DataType.Text)]
    [DefaultValue("John")]
    public required string FirstName { get; set; }

    /// <summary>
    /// The App users last name.
    /// </summary>
    /// <value>Doe</value>
    [Required]
    [DataType(DataType.Text)]
    [DefaultValue("Doe")]
    public required string LastName { get; set; }
}
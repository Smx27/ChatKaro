using System.ComponentModel;

namespace ChatKaro.API.Controllers.DTO.Authentication;

/// <summary>
/// Data transfer object for refresh token action
/// </summary>
public class RefreshTokenDto
{
    /// <summary>
    /// User Name
    /// </summary>
    [DefaultValue("TestUser1")]
    public required string UserName { get; set; }

    /// <summary>
    /// Refresh Token
    /// </summary>
    [DefaultValue("")]
    public required string RefreshToken { get; set; }
}
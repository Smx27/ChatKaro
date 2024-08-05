using System.ComponentModel;

namespace ChatKaro.API.Controllers.DTO.Authentication;

/// <summary>
/// Data transfer object for login action
/// </summary>
public class LoginDto
{
    /// <summary>
    /// User name for user
    /// </summary>
    [DefaultValue("TestUser@gmail.com")]
    public string UserName { get; set; } = string.Empty;

    /// <summary>
    /// Password of the user 
    /// </summary>
    [DefaultValue("Pa$$w0rd")]
    public string Password { get; set; } = string.Empty;
}
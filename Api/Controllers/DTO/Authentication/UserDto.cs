namespace ChatKaro.API.Controllers.DTO.Authentication;

/// <summary>
/// User data transfer object to send while login
/// </summary>
public class UserDto
{
    /// <summary>
    /// Constructor to initialize <see cref="UserDto"/>
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="jwtToken"></param>
    /// <param name="refreshToken"></param>
    /// <param name="refreshTokenExpires"></param>
    /// <param name="email"></param>
    public UserDto(string? userName, string jwtToken, string refreshToken, DateTime refreshTokenExpires, string? email)
    {
        UserName = userName;
        JwtToken = jwtToken;
        RefreshToken = refreshToken;
        RefreshTokenExpires = refreshTokenExpires;
        Email = email;
    }

    /// <summary>
    /// Username of the user
    /// </summary>
    /// <value>SampleUsername</value>
    public string? UserName { get; set; }

    /// <summary>
    /// Token of the user
    /// </summary>
    /// <value>SampleJwtToken</value>
    public string JwtToken { get; set; }

    /// <summary>
    /// Refresh token of the user
    /// </summary>
    /// <value>Some RandomlyGenerated hashed string</value>
    public string RefreshToken { get; set; }

    /// <summary>
    /// Refresh token expiry date
    /// </summary>
    /// <value>Token expiry date</value>
    public DateTime RefreshTokenExpires { get; set; }

    /// <summary>
    /// Email of the user
    /// </summary>
    /// <value>SampleEmail</value>
    public string? Email { get; set; }
}
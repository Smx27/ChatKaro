using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using ChatKaro.API.Controllers.DTO.Authentication;
using ChatKaro.API.Data.Entities;
using ChatKaro.API.Data.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace ChatKaro.API.Controllers.Authentication;

/// <summary>
/// Api Controller to handle user authentication
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IJwtTokenService _tokenService;
    private readonly SignInManager<AppUser> _signInManager;

    /// <inheritdoc />
    public AuthController(UserManager<AppUser> userManager, IJwtTokenService tokenService,
        SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    /// <summary>
    /// Registers a new user and sends a confirmation email
    /// </summary>
    /// <param name="registrationDto"></param>
    /// <returns>User data with tokens</returns>
    [HttpPost("register")]
    [SwaggerOperation("Registers a new user and sends a confirmation email")]
    [SwaggerResponse(StatusCodes.Status200OK,
        "Registration successful. Please check your email to confirm your account.")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "If username already exists or registration fails.")]
    public async Task<IActionResult> Register([FromBody] RegistrationDto registrationDto)
    {
        if (await UserExist(registrationDto.Username))
            return BadRequest("Username already exists");

        var user = new AppUser
        {
            FirstName = registrationDto.FirstName,
            LastName = registrationDto.FirstName,
            Email = registrationDto.Email,
            UserName = registrationDto.Username,
        };
        var result = await _userManager.CreateAsync(user, registrationDto.Password);

        if (!result.Succeeded)
            return BadRequest("Failed to create user");

        var roleResult = await _userManager.AddToRoleAsync(user, "User");
        var createdUser = await _userManager.FindByNameAsync(user.UserName ?? string.Empty);

        if (!roleResult.Succeeded)
        {
            if (createdUser != null)
                await _userManager.DeleteAsync(createdUser);
            return BadRequest("Failed to create user");
        }

        // Adding default claims
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.NameId, createdUser?.Id.ToString() ?? "0"),
            new(JwtRegisteredClaimNames.UniqueName, user.UserName ?? "Anonymous"),
            new(ClaimTypes.Role, "User")
        };
        if (createdUser != null) await _userManager.AddClaimsAsync(createdUser, claims);

        return Ok("Registration successful. Please check your email to confirm your account.");
    }

    /// <summary>
    /// Refreshes the JWT token
    /// </summary>
    /// <param name="tokenDto"></param>
    /// <returns>New JWT token and refresh token</returns>
    [HttpPost("refresh")]
    [SwaggerOperation("Refreshes the JWT token")]
    [SwaggerResponse(StatusCodes.Status200OK, "New JWT token and refresh token generated successfully")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "If refresh token validation fails")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto tokenDto)
    {
        if (string.IsNullOrEmpty(tokenDto.UserName) || string.IsNullOrEmpty(tokenDto.RefreshToken))
            return BadRequest("Username or RefreshToken is not provided or empty");

        var result = await ValidateRefreshToken(tokenDto.RefreshToken, tokenDto.UserName);

        if (!result)
            return BadRequest("Invalid Refresh Token. Please login");

        var user = await _userManager.FindByNameAsync(tokenDto.UserName);
        if (user == null)
            return BadRequest("Failed to generate token");
        var userClaims = await _userManager.GetClaimsAsync(user);
        var userDto = new UserDto(
            email: user.Email,
            userName: user.UserName,
            jwtToken: await _tokenService.CreateTokenAsync(user, (List<Claim>?)userClaims),
            refreshToken: await _tokenService.CreateRefreshToken(user),
            refreshTokenExpires: DateTime.UtcNow.AddDays(7)
        );

        if (userDto.UserName != null)
            await SaveRefreshToken(_userManager, userDto.RefreshToken, userDto.UserName, userDto.RefreshTokenExpires);

        return Ok(userDto);
    }

    /// <summary>
    /// Logs in the user
    /// </summary>
    /// <param name="loginDto"></param>
    /// <returns>User data with tokens</returns>
    [HttpPost("login")]
    [SwaggerOperation("Logs in the user")]
    [SwaggerResponse(StatusCodes.Status200OK, "User logged in successfully with tokens")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, "If login fails (invalid username or password)")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync(u =>
            (u.UserName != null && u.UserName.Equals(loginDto.UserName) ||
             (u.Email != null && u.Email.Equals(loginDto.UserName)) || (u.PhoneNumber != null && u.PhoneNumber.Equals(loginDto.UserName)) ) );
        if (user == null)
            return BadRequest("Invalid username or password");

        // Get user claims
        var userClaims = await _userManager.GetClaimsAsync(user);
        
        var userDto = new UserDto(
            email: user.Email,
            userName: user.UserName,
            jwtToken: await _tokenService.CreateTokenAsync(user, (List<Claim>?)userClaims),
            refreshToken: await _tokenService.CreateRefreshToken(user),
            refreshTokenExpires: DateTime.UtcNow.AddDays(7)
        );

        if (userDto.UserName != null)
            await SaveRefreshToken(_userManager, userDto.RefreshToken, userDto.UserName, userDto.RefreshTokenExpires);

        return Ok(userDto);
    }
    
    // TODO: Add a mobile otp based login system 
    
    #region Private Helper Methods

    private async Task<bool> UserExist(string username)
    {
        return await _userManager.Users.AnyAsync(u =>
            u.UserName != null && u.UserName.Equals(username));
    }

    private static async Task SaveRefreshToken(UserManager<AppUser> userManager, string refreshToken, string userName,
        DateTime expiresAt)
    {
        var user = await userManager.FindByNameAsync(userName);
        if (user == null) return;

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = expiresAt;
        await userManager.UpdateAsync(user);
    }

    private async Task<bool> ValidateRefreshToken(string refreshToken, string username)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == username);
        return user?.RefreshToken != null && user.RefreshToken.Equals(refreshToken) &&
               user.RefreshTokenExpiryTime >= DateTime.UtcNow;
    }

    #endregion
}
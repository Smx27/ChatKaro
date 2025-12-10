using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ChatKaro.API.Data.Entities;
using ChatKaro.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace ChatKaro.Tests.Services;

public class JwtTokenServiceTests
{
    private readonly Mock<UserManager<AppUser>> _userManagerMock;
    private readonly Mock<IConfiguration> _configMock;
    private readonly JwtTokenService _service;
    private readonly string _tokenKey = "super secret key that is at least 64 bytes long for hmac sha512 signature verification";

    public JwtTokenServiceTests()
    {
        var store = new Mock<IUserStore<AppUser>>();
        _userManagerMock = new Mock<UserManager<AppUser>>(store.Object, null, null, null, null, null, null, null, null);

        _configMock = new Mock<IConfiguration>();
        var configSectionMock = new Mock<IConfigurationSection>();
        configSectionMock.Setup(x => x.Value).Returns(_tokenKey);
        _configMock.Setup(x => x.GetSection("JwtToken")).Returns(configSectionMock.Object);
        // Also support GetValue<string>("JwtToken") which is an extension method but effectively uses GetSection or similar provider access.
        // Actually GetValue is an extension method, we can't mock it directly easily without setting up the provider.
        // A simpler way is to use in-memory configuration or setup the mock to return the value when indexer is accessed if needed.
        // But JwtTokenService uses `config.GetValue<string>("JwtToken")`.
        // `GetValue` calls `IConfiguration.GetSection(key).Value`.

        _configMock.Setup(c => c.GetSection("JwtToken")).Returns(configSectionMock.Object);

        _service = new JwtTokenService(_userManagerMock.Object, _configMock.Object);
    }

    [Fact]
    public async Task CreateTokenAsync_ReturnsToken_WhenUserIsValid()
    {
        // Arrange
        var user = new AppUser { Id = 1, UserName = "testuser" };
        _userManagerMock.Setup(x => x.GetRolesAsync(user)).ReturnsAsync(new List<string> { "Member" });

        // Act
        var token = await _service.CreateTokenAsync(user, null);

        // Assert
        Assert.NotNull(token);
        Assert.NotEmpty(token);

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);
        Assert.Equal("testuser", jwtToken.Claims.First(c => c.Type == JwtRegisteredClaimNames.UniqueName).Value);
    }

    [Fact]
    public async Task CreateRefreshToken_ReturnsString()
    {
        // Arrange
        var user = new AppUser { UserName = "testuser" };

        // Act
        var token = await _service.CreateRefreshToken(user);

        // Assert
        Assert.NotNull(token);
        Assert.NotEmpty(token);
    }
}
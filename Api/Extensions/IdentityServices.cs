using Microsoft.AspNetCore.Identity;
using ChatKaro.API.Data;
using ChatKaro.API.Data.Entities;

namespace ChatKaro.API.Extensions;

/// <summary>
/// Provides extension methods for configuring Microsoft Identity services in an ASP.NET Core application.
/// </summary>
public static class IdentityServices
{
    /// <summary>
    /// Adds the bare minimum Microsoft Identity services which will be used for authentication and user management.
    /// <example>RoleManager, SignInManager, TokenProvider</example>
    /// </summary>
    /// <param name="services">The service collection to which the identity services will be added.</param>
    /// <returns>An <see cref="IdentityBuilder"/> for creating and configuring the identity system.</returns>
    public static IServiceCollection AddIdentityServices(this IServiceCollection services)
    {
        services.AddIdentityCore<AppUser>(opt => { opt.Password.RequireNonAlphanumeric = false; })
            .AddRoles<AppRole>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddTokenProvider<DataProtectorTokenProvider<AppUser>>(TokenOptions.DefaultProvider)
            .AddEntityFrameworkStores<DataContext>();
        return services;
    }
}
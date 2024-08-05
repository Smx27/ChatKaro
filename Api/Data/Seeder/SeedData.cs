using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ChatKaro.API.Data.Entities;

namespace ChatKaro.API.Data.Seeder;

/// <summary>
/// Provides methods to seed default user and role data into the application.
/// </summary>
public static class SeedData
{
    /// <summary>
    /// Adds default user data to the application, including roles and an admin user.
    /// This method should only be called if there are no existing users in the system.
    /// </summary>
    /// <param name="userManager">An instance of UserManager used for managing users.</param>
    /// <param name="roleManager">An instance of RoleManager used for managing roles.</param>
    /// <returns>A Task that represents the asynchronous operation.</returns>
    public static async Task AddDefaultUserData(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        // Check if there are any existing users
        if (await userManager.Users.AnyAsync())
            return;

        // Create default roles
        var roles = new[]
        {
            new AppRole { Name = "Admin" },
            new AppRole { Name = "User" }
        };
        foreach (var role in roles)
            await roleManager.CreateAsync(role);

        // Create default admin user
        var adminUser = new AppUser
        {
            FirstName = "Admin",
            LastName = "Admin",
            Email = "Admin@ChatKaro.com",
            UserName = "Admin",
            IsActive = true,
            IsDeleted = false
        };
        await userManager.CreateAsync(adminUser, "Pa$$w0rd");
        await userManager.AddToRoleAsync(adminUser, "Admin");
    }
}
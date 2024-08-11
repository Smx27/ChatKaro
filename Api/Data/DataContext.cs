using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ChatKaro.API.Data.Entities;

namespace ChatKaro.API.Data;

/// <summary>
/// Data context to represent database type for entity framework
/// </summary>
public class DataContext : IdentityDbContext<AppUser,
    AppRole, int, IdentityUserClaim<int>, UserRole,
    IdentityUserLogin<int>,
    IdentityRoleClaim<int>,
    IdentityUserToken<int>>
{
    /// <inheritdoc />
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    /// <summary>
    /// Db set for Exception log table
    /// </summary>
    public DbSet<ExceptionLog> ExceptionLogs { get; set; }

    public DbSet<Message> Messages { get; set; }

    public DbSet<Group?> Groups { get; set; }
    public DbSet<Connection?> Connections { get; set; }
    
    /// <inheritdoc />
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<AppUser>()
            .HasMany(ur => ur.Roles)
            .WithOne(u => u.User)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

        builder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(r => r.Role)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();
    }
}
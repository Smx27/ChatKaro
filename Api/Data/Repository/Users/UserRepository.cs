using ChatKaro.API.Data.Entities;
using ChatKaro.API.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChatKaro.API.Data.Repository.Users;

/// <summary>
/// Repository to manage user via unit of work
/// </summary>
public class UserRepository : GenericRepository<AppUser>, IUserRepository
{
    
    /// <summary>
    /// Initializes a new instance of the UserRepository class with the specified DataContext.
    /// </summary>
    /// <param name="context">The DataContext to use for database operations.</param>
    public UserRepository(DbContext context) : base(context) { }
}
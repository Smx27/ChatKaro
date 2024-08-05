using ChatKaro.API.Data.Entities;

namespace ChatKaro.API.Data.Interfaces;

/// <summary>
/// Defines the contract for a unit of work, managing transactions and coordinating changes across multiple repositories.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    /// <summary>
    /// Gets the repository for logging exceptions.
    /// </summary>
    IExceptionLogRepository ExceptionLog { get; }

    /// <summary>
    /// Asynchronously saves all changes made in the unit of work to the database.
    /// </summary>
    /// <returns>A task representing the asynchronous operation, containing the number of state entries written to the database.</returns>
    Task<int> SaveChangesAsync();

    /// <summary>
    /// Checks if there are any changes that need to be saved.
    /// </summary>
    /// <returns>True if there are changes; otherwise, false.</returns>
    bool HasChanges();
}
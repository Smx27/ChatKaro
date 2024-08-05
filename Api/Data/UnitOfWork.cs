using ChatKaro.API.Data.Interfaces;
using ChatKaro.API.Data.Repository;

namespace ChatKaro.API.Data;

/// <summary>
/// Represents a unit of work for managing transactions and coordinating changes across multiple repositories.
/// </summary>
public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _context;

    /// <summary>
    /// Initializes a new instance of the UnitOfWork class with the specified DataContext.
    /// </summary>
    /// <param name="context">The DataContext to use for database operations.</param>
    public UnitOfWork(DataContext context)
    {
        _context = context;
        ExceptionLog = new ExceptionLogRepository(_context);
    }

    /// <summary>
    /// Gets the repository for logging exceptions.
    /// </summary>
    public IExceptionLogRepository ExceptionLog { get; private set; }

    /// <summary>
    /// Asynchronously saves all changes made in the unit of work to the database.
    /// </summary>
    /// <returns>A task representing the asynchronous operation, containing the number of state entries written to the database.</returns>
    public async Task<int> SaveChangesAsync()
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var result = await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return result;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    /// <summary>
    /// Checks if there are any changes that need to be saved.
    /// </summary>
    /// <returns>True if there are changes; otherwise, false.</returns>
    public bool HasChanges()
    {
        return _context.ChangeTracker.HasChanges();
    }

    /// <summary>
    /// Disposes of the resources used by the UnitOfWork.
    /// </summary>
    public async void Dispose()
    {
        await Dispose(true);
        GC.SuppressFinalize(this);
    }

    private async Task Dispose(bool isDisposing)
    {
        if (isDisposing) await _context.DisposeAsync();
    }

    /// <summary>
    /// Finalizer for the UnitOfWork class to ensure resources are released.
    /// </summary>
    ~UnitOfWork()
    {
        _ = Dispose(true);
    }
}
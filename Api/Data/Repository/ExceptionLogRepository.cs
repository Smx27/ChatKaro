using ChatKaro.API.Data.Entities;
using ChatKaro.API.Data.Interfaces;

namespace ChatKaro.API.Data.Repository;

/// <summary>
/// Represents a repository for logging exceptions, implementing the IExceptionLogRepository interface.
/// </summary>
public class ExceptionLogRepository : GenericRepository<ExceptionLog>, IExceptionLogRepository
{
    private readonly DataContext _context;

    /// <summary>
    /// Initializes a new instance of the ExceptionLogRepository class with the specified DataContext.
    /// </summary>
    /// <param name="context">The DataContext to use for database operations.</param>
    public ExceptionLogRepository(DataContext context) : base(context)
    {
        _context = context;
    }

    /// <summary>
    /// Asynchronously logs an exception by creating a new ExceptionLog entity with the exception details and adding it to the database.
    /// </summary>
    /// <param name="exception">The exception to log.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    public async Task LogException(Exception exception)
    {
        var log = new ExceptionLog()
        {
            Area = "",
            Message = exception.Message,
            StackTrace = exception.StackTrace,
            TimeStamp = DateTime.UtcNow
        };
        await _context.ExceptionLogs.AddAsync(log);
    }
}
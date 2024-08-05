using ChatKaro.API.Data.Entities;

namespace ChatKaro.API.Data.Interfaces;

/// <summary>
/// Defines the contract for an exception logging repository, extending generic repository functionality.
/// </summary>
public interface IExceptionLogRepository : IGenericRepository<ExceptionLog>
{
    /// <summary>
    /// Asynchronously logs the details of an exception.
    /// </summary>
    /// <param name="exception">The exception to log.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task LogException(Exception exception);
}
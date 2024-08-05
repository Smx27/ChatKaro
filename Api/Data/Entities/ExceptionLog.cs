using System.ComponentModel.DataAnnotations;

namespace ChatKaro.API.Data.Entities;

/// <summary>
/// Represents an exception log entry, storing information about an exception that occurred in the application.
/// </summary>
public class ExceptionLog
{
    /// <summary>
    /// Gets or sets the unique identifier for the exception log entry.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the message associated with the exception.
    /// </summary>
    [StringLength(150)]
    public string? Message { get; set; }

    /// <summary>
    /// Gets or sets the stack trace of the exception.
    /// </summary>
    [StringLength(Int32.MaxValue)]
    public string? StackTrace { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the exception occurred, set to the current UTC time by default.
    /// </summary>
    public DateTime TimeStamp { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the area of the application where the exception occurred.
    /// </summary>
    [StringLength(150)]
    public string? Area { get; set; }
}
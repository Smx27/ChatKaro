namespace ChatKaro.API.Controllers.DTO.Exception;

/// <summary>
/// Data transfer object for exception while processing request
/// </summary>
/// <param name="statusCode">HttpStatus code to represent error type <example>200,201,400,404</example></param>
/// <param name="message">Error message for the user</param>
/// <param name="details">We will send stack tress when in development mode</param>
public class ApiExceptionDto(int statusCode, string message, string? details = null)
{
    /// <summary>
    /// The HTTP status code associated with the exception.
    /// </summary>
    public int StatusCode { get; set; } = statusCode;

    /// <summary>
    /// A brief description of the exception.
    /// </summary>
    public string Message { get; set; } = message;

    /// <summary>
    /// Additional details about the exception (optional).
    /// </summary>
    public string? Details { get; set; } = details;
}
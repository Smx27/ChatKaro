using System.Net;
using System.Text.Json;
using ChatKaro.API.Controllers.DTO.Exception;
using ChatKaro.API.Data.Interfaces;

namespace ChatKaro.API.Middleware;

/// <summary>
/// Represents middleware for handling exceptions that occur during the execution of an ASP.NET Core application.
/// </summary>
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    private readonly JsonSerializerOptions _jsonSerializerOptions = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    /// <summary>
    /// Initializes a new instance of the ExceptionMiddleware class with the specified RequestDelegate, ILogger, and IHostEnvironment.
    /// </summary>
    /// <param name="next">The next middleware in the pipeline.</param>
    /// <param name="logger">The logger used for logging exception details.</param>
    /// <param name="environment">The hosting environment of the application.</param>
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }

    /// <summary>
    /// Asynchronously invokes the middleware, catching any exceptions that occur during the request processing and generating an appropriate response.
    /// </summary>
    /// <param name="context">The HTTP context of the current request.</param>
    /// <param name="logRepository">The repository used for logging exceptions.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    public async Task InvokeAsync(HttpContext context, IExceptionLogRepository logRepository)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
            _logger.LogError(e, e.Message);
            await logRepository.LogException(e);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = _environment.IsDevelopment()
                ? new ApiExceptionDto(context.Response.StatusCode, e.Message, e.StackTrace)
                : new ApiExceptionDto(context.Response.StatusCode, e.Message,
                    "Internal Server Error \n Please Contact Admins");

            var json = JsonSerializer.Serialize(response, _jsonSerializerOptions);

            await context.Response.WriteAsync(json);
        }
    }
}
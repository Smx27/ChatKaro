using System.Data;
using ChatKaro.API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ChatKaro.API.Filters;

/// <inheritdoc />
public class LogUserActivityFilter : IAsyncActionFilter
{
    /// <inheritdoc />
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();
        
        if(resultContext.HttpContext.User.Identity is { IsAuthenticated: false }) return;
        
        // var userId = resultContext.HttpContext.User.GetUserId();

        var userManager = resultContext.HttpContext.RequestServices.GetRequiredService<UserManager<AppUser>>();

        var user = await userManager.GetUserAsync(resultContext.HttpContext.User);

        if (user != null)
        {
            user.LastActive = DateTime.UtcNow;
            await userManager.UpdateAsync(user);
        }
        
        userManager.Dispose();
        
    }
}
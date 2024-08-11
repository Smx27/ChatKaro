using ChatKaro.API.Middleware;

namespace ChatKaro.API.Extensions
{
    /// <summary>
    /// Provides extension methods for configuring the web application.
    /// </summary>
    public static class WebApplicationExtension
    {
        /// <summary>
        /// Configures the HTTP request pipeline and adds default data to the application.
        /// </summary>
        /// <param name="app">The <see cref="WebApplication"/> to configure.</param>
        public static async Task AddWebApplication(this WebApplication app)
        {
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                // Enable Swagger for API documentation in the development environment.
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint($"/swagger/v1/swagger.json", app.Configuration["SwaggerOptions:Version"]);
                    options.RoutePrefix = "swagger";
                });
                app.MapSwagger();
            }
            
            // Add custom middleware for handling exceptions.
            app.UseMiddleware<ExceptionMiddleware>();

            // Redirect HTTP requests to HTTPS.
            app.UseHttpsRedirection();

            // Enable authentication and authorization.
            app.UseAuthentication();
            app.UseAuthorization();

            // Map controller routes.
            app.MapControllers();

            // Add default data to the application, such as roles and the admin user.
            await app.AddDefaultApplicationData();
        }
    }
}
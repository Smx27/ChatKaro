using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ChatKaro.API.Data;
using ChatKaro.API.Data.Entities;
using ChatKaro.API.Data.Interfaces;
using ChatKaro.API.Data.Repository;
using ChatKaro.API.Data.Seeder;
using ChatKaro.API.Services;

namespace ChatKaro.API.Extensions;

/// <summary>
/// Provides extension methods for configuring Multiple services like <example>AddSqLiteDatabase(),AddAuthenticationAndTokenValidation()</example>
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// This is an extension method for <see cref="IServiceCollection"/> to add sqlLite
    /// Database for application
    /// </summary>
    /// <param name="services"></param>
    /// <param name="connectionString">Connection string for SQLite <example>"data source= ChatKaro.db"</example></param>
    /// <returns><see cref="IServiceCollection"/> With SqlLite db configuration</returns>
    public static IServiceCollection AddSqLiteDatabase(this IServiceCollection services, string? connectionString)
    {
        services.AddDbContext<DataContext>(option => { option.UseSqlite(connectionString); });
        return services;
    }

    /// <summary>
    /// Adds authentication to application. Please feel free to modify this according to your measure
    /// <see cref="ServiceCollectionExtensions"/>
    /// </summary>
    /// <param name="services"><see cref="IServiceCollection"/> Specifies the contract for a collection of service descriptors.</param>
    /// <param name="jwtSigningKey">A random 512Byte token which will be used like salt for encryption.</param>
    /// <returns>A <see cref="AuthenticationBuilder"/> that can be used to further configure authentication.</returns>
    public static IServiceCollection AddAuthenticationAndTokenValidation(this IServiceCollection services,
        string? jwtSigningKey)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                // options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSigningKey ?? string.Empty)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        return services;
    }

    /// <summary>
    /// Adds default OpenAPI configuration for the APIs, utilizing settings from the appsettings file.
    /// </summary>
    /// <param name="services"><see cref="IServiceCollection"/> Specifies the contract for a collection of service descriptors.</param>
    /// <param name="config"><see cref="IConfiguration"/> To access the appsettings file for configuration values.</param>
    /// <returns><see cref="IServiceCollection"/> The updated service collection with Swagger configuration.</returns>
    /// <remarks>
    /// This method configures Swagger documentation for the API, including details such as the version, title, 
    /// description, terms of service, contact information, and license details, all sourced from the 
    /// "SwaggerOptions" section in the appsettings.json file. Additionally, it sets up JWT Bearer token 
    /// authentication for securing API endpoints.
    /// 
    /// Ensure that the appsettings.json file contains the necessary Swagger configuration properties 
    /// for proper documentation display.
    /// </remarks>
    /// <example>
    /// Example usage:
    /// <code>
    /// services.AddSwaggerDocAndApplicationInfo(builder.configuration);
    /// </code>
    /// </example>
    public static IServiceCollection AddSwaggerDocAndApplicationInfo(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddSwaggerGen(swaggerGenOptions =>
        {
            swaggerGenOptions.EnableAnnotations();
            swaggerGenOptions.SwaggerDoc(config["SwaggerOptions:Version"],
                new OpenApiInfo
                {
                    Version = config["SwaggerOptions:Version"],
                    Title = config["SwaggerOptions:Title"],
                    Description = config["SwaggerOptions:Description"],
                    TermsOfService = new Uri(config["SwaggerOptions:TermsOfService"] ?? string.Empty),
                    Contact = new OpenApiContact
                    {
                        Name = config["SwaggerOptions:Contact:Name"],
                        Url = new Uri(config["SwaggerOptions:Contact:Url"] ?? string.Empty)
                    },
                    License = new OpenApiLicense
                    {
                        Name = config["SwaggerOptions:License:Name"],
                        Url = new Uri(config["SwaggerOptions:License:Url"] ?? string.Empty)
                    }
                });
            swaggerGenOptions.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description =
                    "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer SomeGeneratedJWTTokenKey\"",
            });
            swaggerGenOptions.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        return services;
    }

    /// <summary>
    /// Adds application dependencies to the service collection.
    /// </summary>
    /// <param name="services">The service collection to add dependencies to.</param>
    /// <returns>The modified service collection with dependencies added.</returns>
    public static IServiceCollection AddApplicationDependencies(this IServiceCollection services)
    {
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IExceptionLogRepository, ExceptionLogRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }


    /// <summary>
    /// Adds default application data by performing database migration and seeding default user data.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication"/> instance to which the default data will be added.</param>
    /// <returns>The updated <see cref="WebApplication"/> instance.</returns>
    /// <exception cref="Exception">Throws an exception if an error occurs during migration or seeding.</exception>
    public static async Task<WebApplication> AddDefaultApplicationData(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var service = scope.ServiceProvider;
        try
        {
            var context = service.GetRequiredService<DataContext>();
            var userManager = service.GetRequiredService<UserManager<AppUser>>();
            var roleManager = service.GetRequiredService<RoleManager<AppRole>>();
            await context.Database.MigrateAsync();
            await SeedData.AddDefaultUserData(userManager, roleManager);
        }
        catch (Exception e)
        {
            var logger = service.GetService<ILogger<Program>>();
            logger?.LogError(e, "An error occur while seeding data/ Migration");
            throw;
        }

        return app;
    }
}
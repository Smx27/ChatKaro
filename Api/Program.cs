using ChatKaro.API.Extensions;
using ChatKaro.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerDocAndApplicationInfo(builder.Configuration);
builder.Services.AddIdentityServices();
// Here this token is must have please add if not 
builder.Services.AddAuthenticationAndTokenValidation(builder.Configuration.GetValue<string>("JwtToken"));
builder.Services.AddSqLiteDatabase(builder.Configuration.GetConnectionString("DefaultConnection"));
// Please add application dependencies here 
builder.Services.AddApplicationDependencies();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();
// Extension method to remove clutter
app.AddWebApplication();

app.Run();
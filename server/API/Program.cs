using System.Text.Json;
using API.Middleware;
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using FluentValidation;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Service;
using Service.Validators;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configure app options from configuration
        builder.Services.Configure<AppOptions>(builder.Configuration.GetSection("AppOptions"));

        // Set up the database context
        builder.Services.AddDbContext<PaperContext>((serviceProvider, options) =>
        {
            var appOptions = serviceProvider.GetRequiredService<IOptions<AppOptions>>().Value;
            var dbConnectionString = Environment.GetEnvironmentVariable("AppOptions__DbConnectionString") 
                                     ?? appOptions.DbConnectionString;

            options.UseNpgsql(dbConnectionString);
        });

        // Add services
        builder.Services.AddScoped<IPaperService, PaperService>();
        builder.Services.AddScoped<IAdminService, AdminService>();
        builder.Services.AddScoped<IValidator<CreateOrderDto>, CreateOrderValidator>();
        builder.Services.AddScoped<IPaperRepository, PaperRepository>();
        builder.Services.AddScoped<IAdminRepository, AdminRepository>();

        // Configure JSON options
        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
        });

        // Set up CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin", builder =>
            {
                builder.WithOrigins("https://nordicpaperstore.web.app") // Allow your frontend origin
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials(); // If you're using credentials like cookies
            });
        });

        builder.Services.AddOpenApiDocument();

        var app = builder.Build();

        // Apply CORS policy
        app.UseCors("AllowSpecificOrigin");

        app.UseForwardedHeaders(
            new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            }
        );

        var options = app.Services.GetRequiredService<IOptions<AppOptions>>().Value;

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseOpenApi();
        app.UseSwaggerUi();
        app.UseStatusCodePages();
        app.UseMiddleware<RequestResponseLoggingMiddleware>();
        
        app.MapControllers();

        var port = Environment.GetEnvironmentVariable("PORT") ?? "5555";
        var url = $"http://0.0.0.0:{port}";
        app.Run(url);
    }
}

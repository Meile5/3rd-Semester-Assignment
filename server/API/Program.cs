using System.Text.Json;
using API.Middleware;
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using FluentValidation;
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
        builder.Services.Configure<AppOptions>(builder.Configuration.GetSection("AppOptions"));

        builder.Services.AddDbContext<PaperContext>(( serviceProvider, options)=>
        {
            var appOptions = serviceProvider.GetRequiredService<IOptions<AppOptions>>().Value;
            options.UseNpgsql(appOptions.DbConnectionString);
        });

              builder.Services.AddScoped<IPaperService, PaperService>();
              builder.Services.AddScoped<IAdminService, AdminService>();
              
              builder.Services.AddScoped<IValidator<CreateOrderDto>, CreateOrderValidator>();


    
        builder.Services.AddScoped<IPaperRepository, PaperRepository > ();
        builder.Services.AddScoped<IAdminRepository, AdminRepository > ();
        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
        });
        builder.Services.AddOpenApiDocument();

        var app = builder.Build();

        var options = app.Services.GetRequiredService<IOptions<AppOptions>>().Value;

        app.UseHttpsRedirection();

        app.UseRouting();


        app.UseOpenApi();
        app.UseSwaggerUi();
        app.UseStatusCodePages();

        app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
        app.UseMiddleware<RequestResponseLoggingMiddleware>();

        //app.UseEndpoints(endpoints => endpoints.MapControllers());

        app.MapControllers();


        app.Run();
    }
    
}
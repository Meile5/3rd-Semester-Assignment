using System.Text.Json;
using API.Middleware;
using DataAccess;
using DataAccess.Interfaces;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Service;

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
            Console.WriteLine(appOptions.DbConnectionString);
            options.UseNpgsql(appOptions.DbConnectionString);
        });

              builder.Services.AddScoped<IPaperService, PaperService>();

    
        builder.Services.AddScoped<IPaperRepository, PaperRepository > ();
        builder.Services.AddControllers();
        builder.Services.AddOpenApiDocument();

        var app = builder.Build();

        var options = app.Services.GetRequiredService<IOptions<AppOptions>>().Value;
        Console.WriteLine("APP OPTIONS: " + JsonSerializer.Serialize(options));

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
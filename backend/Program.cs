using backend.Context;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using SQLitePCL;


Batteries_V2.Init();
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<DataContext>(options =>
                                            options.UseSqlite("Data Source=mydatabase.sqlite")
                                          );

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
    );
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

// OpenAPI JSON
app.MapOpenApi();

// Scalar UI
app.MapScalarApiReference(options =>
{
    options.WithTitle("Mi API 🚀");
});

// 🔥 Hacer que "/" redirija a Scalar
app.MapGet("/", context =>
{
    context.Response.Redirect("/scalar");
    return Task.CompletedTask;
});

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    db.Database.EnsureCreated();
}

app.Run();


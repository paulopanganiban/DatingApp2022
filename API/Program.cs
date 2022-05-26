using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
IWebHostEnvironment environment = builder.Environment;
// Add services to the container.
// https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-6.0
// rereview this
var MyAllowSpecificOrigins = "AllowSpecificOrigins";
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
https://stackoverflow.com/questions/70952271/startup-cs-class-is-missing-in-net-6
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
});
// add CORS
builder.Services.AddCors(options =>
{
    // why we need the string? is it the key of the policy??
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          
                          policy.WithOrigins("https://localhost:4200",
                                              "http://localhost:4200");
                      });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();

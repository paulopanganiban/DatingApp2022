using System.Text;
using API.Data;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
builder.Services.AddScoped<ITokenService, TokenService>();
// https://stackoverflow.com/questions/70952271/startup-cs-class-is-missing-in-net-6
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

                          policy
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .WithOrigins("https://localhost:4200",
                          "http://localhost:4200");
                      });
});
// from the package JWTBearer 
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"])),
            // issuer is the server
            ValidateIssuer = false,
            // audience is our angular app
            ValidateAudience = false
        };
    });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseRouting();

// order matters
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();
// end order matters

app.MapControllers();

app.Run();

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NeuronaLabs;
using NeuronaLabs.Database;
using NeuronaLabs.Scheme.Mutation;
using NeuronaLabs.Scheme.Query;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

builder.Services.AddNeuronaLabsServices();

builder.Services.AddDbContext<NeuronaLabsDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("sqlConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin()
                .SetIsOriginAllowedToAllowWildcardSubdomains()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidateAudience = true,
                   ValidateLifetime = true,
                   ValidateIssuerSigningKey = true,
                   ValidIssuer = builder.Configuration["JwtTokenSettings:Issuer"],
                   ValidAudience = builder.Configuration["JwtTokenSettings:Audience"],
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                       builder.Configuration["JwtTokenSettings:SecretKey"]))
               };
           });

builder.Services.AddCustomOptions(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseCors();

app.MapGraphQL()
    .RequireAuthorization();

app.Run();

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NeuronaLabs;
using NeuronaLabs.Application;
using NeuronaLabs.Application.GraphQL.Mutations.Diagnoses;
using NeuronaLabs.Application.GraphQL.Mutations.Patients;
using NeuronaLabs.Application.GraphQL.Queries.Patients;
using NeuronaLabs.Infrastructure;
using NeuronaLabs.Infrastructure.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder
    .Services.AddGraphQLServer()
    .ModifyRequestOptions(o =>
    {
        o.IncludeExceptionDetails = true;
    })
    .AddQueryType<PatientQuery>()
    .AddMutationType<PatientMutation>()
    .AddType<DiagnosisMutation>();

builder.Services.AddDbContext<NeuronaLabsDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("sqlConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .AllowAnyOrigin()
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JwtTokenSettings:SecretKey"])
            ),
        };
    });

builder.Services.AddInfrastructure(builder.Configuration).AddApplication();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.MapGraphQL();

app.Run();

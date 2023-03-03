using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Utils.EmailConfiguration;
using CleanArchitecture.Infrastructure.Files;
using CleanArchitecture.Infrastructure.Identity;
using CleanArchitecture.Infrastructure.Persistence;
using CleanArchitecture.Infrastructure.Persistence.Interceptors;
using CleanArchitecture.Infrastructure.Services;
using CleanArchitecture.Infrastructure.Utils.Extensions;
using CleanArchitecture.Infrastructure.Utils.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<AuditableEntitySaveChangesInterceptor>();
        //if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        //{
        //    services.AddDbContext<ApplicationDbContext>(options =>
        //        options.UseInMemoryDatabase("CleanArchitectureDb"));
        //}
        //else
        //{
        //    services.AddDbContext<ApplicationDbContext>(options =>
        //        options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
        //            builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        //}
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("sqlServer"),
                   builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName));
        });
        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<ApplicationDbContextInitialiser>();


        services.ConfigureIdentity();
        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<IIdentityService, IdentityService>();
        services.AddTransient<IEmailService, EmailService>();
        services.AddTransient<IEmailConfirmTokenHelper, EmailConfirmTokenHelper>();
        services.AddTransient<IPasswordResetTokenHelper, PasswordResetTokenHelper>();
        services.AddTransient<TokenHelper, EmailConfirmTokenHelper>();
        services.AddTransient<TokenHelper, PasswordResetTokenHelper>();
        services.AddTransient<EmailConfiguration>();
        services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();

        return services;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Utils.EmailConfiguration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CleanArchitecture.Infrastructure.Utils.Extensions;
public static class EmailSenderExtension
{
    public static void ConfigureEmailSender(this IServiceCollection services, IConfiguration configuration)
    {
        var emailConfig = configuration
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
        services.AddSingleton(emailConfig);
    }
}

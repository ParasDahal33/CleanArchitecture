namespace WebUI.Extensions;

public static class CorsExtension
{

    // TODO Configure cors properly.
    public static void ConfigureCors(this IServiceCollection services, string myAllowSpecificOrigins)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(myAllowSpecificOrigins,
                builder => builder
                .WithOrigins(
                    "http://127.0.0.1:5173",
                    "http://127.0.0.1:5210",
                    "http://localhost:5173",
                    "*",
                    "http://192.168.0.137:1337"
                    )
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
        });
    }
}

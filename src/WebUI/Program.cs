using CleanArchitecture.Infrastructure.Persistence;
using CleanArchitecture.Infrastructure.Utils.Extensions;
using WebUI.Extensions;
using WebUI.Services;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var myAllowSpecificOrigins = "AllowOrigin";
// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWebUIServices();
builder.Services.ConfigureAuth(configuration);
builder.Services.ConfigureEmailSender(configuration);
builder.Services.ConfigureCors(myAllowSpecificOrigins);
builder.Services.AddWindowsService();
builder.Services.AddHostedService<ServiceA>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();

    // Initialise and seed database
    using (var scope = app.Services.CreateScope())
    {
        var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
        await initialiser.InitialiseAsync();
        await initialiser.SeedAsync();
    }
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseCors(myAllowSpecificOrigins);
app.UseCustomSwagger();
app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
//app.UseIdentityServer();
app.UseAuthorization();
app.MapControllers();
app.UseDeveloperExceptionPage();

if ((app.Environment.IsStaging() || app.Environment.IsProduction()) && !args.Contains("dev"))
{
    app.Run(configuration.GetSection("RunUrl").Value);
}
app.Run();

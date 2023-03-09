using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Authentication.Commands.ValidateUser;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace CleanArchitecture.Application.Authentication.Commands.RefreshToken;
public record RefreshTokenCommand : IRequest<UserLoginResponse>
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, UserLoginResponse>
{
    private readonly IIdentityService _identityService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _db;
    private readonly IConfiguration _configuration;
    public RefreshTokenCommandHandler(IIdentityService identityService,
        UserManager<ApplicationUser> userManager,
        IApplicationDbContext db,
        IConfiguration configuration)
    {
        _identityService = identityService;
        _userManager = userManager;
        _db = db;
        _configuration = configuration;
    }

    public async Task<UserLoginResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var currentToken = _db.UserRefreshTokens.FirstOrDefault(t => t.UserRefreshToken == request.RefreshToken);
        if (currentToken == null)
        {
            throw new BadRequestException("Invalid token.");
        }
        var userId = currentToken.UserId;
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new BadRequestException("Invalid token.");
        }
        if (currentToken.RefreshTokenExpiryTime <= DateTime.Now)
        {
            throw new BadRequestException("Token already expired.");
        }
        var newAccessToken = await _identityService.CreateAccessToken(user);
        var newRefreshToken = _identityService.CreateRefreshToken();
        // Add the new refresh token to te database.
        var newUserToken = new UserToken
        {
            UserId = user.Id
        };
        var jwtSettings = _configuration.GetSection("JwtSettings");
        newUserToken.UserRefreshToken = newRefreshToken;
        newUserToken.RefreshTokenExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.GetSection("expires").Value));
        // TODO try catch
        _db.UserRefreshTokens.Add(newUserToken);
        // Remove the old token from the database.
        _db.UserRefreshTokens.Remove(currentToken);
        await _db.SaveChangesAsync(cancellationToken);
        await _userManager.UpdateAsync(user);
        return (new UserLoginResponse
        { AccessToken = newAccessToken, RefreshToken = newRefreshToken });
    }
}

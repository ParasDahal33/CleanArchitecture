using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace CleanArchitecture.Application.Authentication.Commands.ValidateUser;
public record ValidateUserCommand : IRequest<UserLoginResponse>
{
    public string Email { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
}

public class ValidateUserCommandHandler : IRequestHandler<ValidateUserCommand, UserLoginResponse>
{
    private readonly IIdentityService _identyService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly IApplicationDbContext _db;

    public ValidateUserCommandHandler(IIdentityService identityService,
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration,
        IApplicationDbContext db)
    {
        _identyService = identityService;
        _userManager = userManager;
        _db = db;
        _configuration= configuration;
    }
    public async Task<UserLoginResponse> Handle(ValidateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            throw new NotFoundException($"User with email {request.Email} not found.");
        var lockOutResult = await _userManager.IsLockedOutAsync(user);
        if (_userManager.SupportsUserLockout && lockOutResult)
            throw new Exception($"User is locked out. Try again after 2 minutes");
        var result = await _userManager.CheckPasswordAsync(user, request.Password);
        if (result == true)
        {
            if (user.UserStatus == UserStatus.InActive)
                throw new Exception("User Status is Deactivated. Please Consult to your Administrator.");
            if (user.PwdExpiry < DateTime.Now)
                throw new Exception("Your password has been expired");
            if (_userManager.SupportsUserLockout && await _userManager.GetAccessFailedCountAsync(user) > 0)
            {
                await _userManager.ResetAccessFailedCountAsync(user);
            }

            var accessToken = await _identyService.CreateAccessToken(user);
            var refreshToken = _identyService.CreateRefreshToken();
            var userToken = new UserToken
            {
                UserId = user.Id
            };
            userToken.UserRefreshToken = refreshToken;
            var jwtSettings = _configuration.GetSection("JwtSettings");
            userToken.RefreshTokenExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.GetSection("expires").Value));
            await _db.UserRefreshTokens.AddAsync(userToken);
            await _db.SaveChangesAsync(cancellationToken);
            await _userManager.UpdateAsync(user);
            return (new UserLoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            });
        }
        else
        {
            if (_userManager.SupportsUserLockout && await _userManager.GetLockoutEnabledAsync(user))
            {
                await _userManager.AccessFailedAsync(user);
            }
            throw new BadRequestException("Incorrect Password ");
        }
    }
}

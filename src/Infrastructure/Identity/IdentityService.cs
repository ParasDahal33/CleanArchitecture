using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
using CleanArchitecture.Application.Authentication.Commands.ValidateUser;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.Common.Utils.EmailConfiguration;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using CleanArchitecture.Infrastructure.Persistence;
using CleanArchitecture.Infrastructure.Utils.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CleanArchitecture.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly IAuthorizationService _authorizationService;
    private readonly ApplicationDbContext _db;
    private readonly IEmailConfirmTokenHelper _emailConfirmToken;
    private readonly IConfiguration _configuration;
    private readonly IEmailService _emailService;


    
    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        IEmailConfirmTokenHelper emailConfrimationToken,
        IConfiguration configuration,
        ApplicationDbContext db,
        IAuthorizationService authorizationService,
        IEmailService emailService)
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _authorizationService = authorizationService;
        _db = db;
        _configuration= configuration;
        _emailConfirmToken = emailConfrimationToken;
        _emailService = emailService;
    }

    public async Task<string> GetUserNameAsync(string userId)
    {
        var user = await _userManager.Users.FirstAsync(u => u.Id == userId);
        return user.UserName;
    }

    public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password)
    {
        var user = new ApplicationUser
        {
            UserName = userName,
            Email = userName,
        };

        var result = await _userManager.CreateAsync(user, password);

        return (result.ToApplicationResult(), user.Id);
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return false;
        }

        var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        return result.Succeeded;
    }

    public async Task<Result> DeleteUserAsync(string userId)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null ? await DeleteUserAsync(user) : Result.Success();
    }

    public async Task<Result> DeleteUserAsync(ApplicationUser user)
    {
        var result = await _userManager.DeleteAsync(user);

        return result.ToApplicationResult();
    }

    public async Task<UserLoginResponse> ValidateUser(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            throw new NotFoundException($"User with email {email} not found.");
        var lockOutResult = await _userManager.IsLockedOutAsync(user);
        if (_userManager.SupportsUserLockout && lockOutResult)
            throw new Exception($"User is locked out. Try again after 2 minutes");
        var result = await _userManager.CheckPasswordAsync(user,password);
        if (result == true)
        {
            if (user.UserStatus == UserStatus.InActive)
               throw new Exception("User Status is Deactivated. Please Consult to your Administrator.");
            if (user.PwdExpiry < DateTime.Now)
               throw new Exception( "Your password has been expired");
            if (_userManager.SupportsUserLockout && await _userManager.GetAccessFailedCountAsync(user) > 0)
            {
                await _userManager.ResetAccessFailedCountAsync(user);
            }

            var accessToken = await CreateAccessToken(user);
            var refreshToken = CreateRefreshToken();
            var userToken = new UserToken
            {
                UserId = user.Id
            };
            userToken.UserRefreshToken = refreshToken;
            var jwtSettings = _configuration.GetSection("JwtSettings");
            userToken.RefreshTokenExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.GetSection("expires").Value));
            await _db.UserRefreshTokens.AddAsync(userToken);
            await _db.SaveChangesAsync();
            await _userManager.UpdateAsync(user);
            return ( new UserLoginResponse {
            AccessToken= accessToken,
            RefreshToken= refreshToken,
            } );
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

    public async Task<EmailConfirmResponse> ConfirmEmail(string id, string token)
    {
        if (string.IsNullOrWhiteSpace(token) || string.IsNullOrWhiteSpace(id))
            throw new BadRequestException("something is wrong with the link. Try it again");

        var user = await _userManager.FindByIdAsync(id);

        if (user is null)
           throw new NotFoundException("User not found");

        if (user.EmailConfirmed && user.PasswordHash != null)
        {
            throw new BadRequestException("Email already confirmed!");
        }
        if (await _emailConfirmToken.ConfirmEmailAction(user, token))
        {
            var result = new EmailConfirmResponse
            {
                Id = id,
                ResetToken = await _userManager.GeneratePasswordResetTokenAsync(user)
            };
            return result;
        }
        throw new BadRequestException("Failed to confirm email.");

    }

    public async Task<bool> ForgotPassword(string Email)
    {
        if (string.IsNullOrWhiteSpace(Email))
            throw new BadRequestException("Email is empty");
        var user = await _userManager.FindByEmailAsync(Email);
        if (user is null)
            throw new NotFoundException("User not found");

        string token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var url = CreateUrlLink(user.Id, token, UrlActions.resetpassword.ToString());

        var mailAddress = new EmailAddress { DisplayName = user.UserName, Address = user.Email };
        var message = new Message(new EmailAddress[] { mailAddress }, "Reset your password", Constants.GetForgetPasswordHtml(user.UserName, url), null);

        await _emailService.SendEmailAsync(message);
        return true;
    }

    
    public async Task<bool> ReSendEmailConfirmation(string Id)
    {
        var user = await _userManager.FindByIdAsync(Id);
        if (user is null)
            throw new BadRequestException("User not found");
        if (user.EmailConfirmed == true)
        {
           throw new BadRequestException("User Email already confirmed.");
        }
        var result = await SendEmailConfirmation(user.Email);
        if (result.Equals(false))
        {
            throw new BadRequestException("Failed to send confirmation");
        }
        return true;
    }


    public async Task<bool> SendEmailConfirmation(string Email)
    {
        if (string.IsNullOrWhiteSpace(Email))
            throw new BadRequestException("Email is empty");
        var user = await _userManager.FindByEmailAsync(Email);
        if (user is null)
            throw new NotFoundException("User not found");

        var token = await _emailConfirmToken.GenerateToken(user);
        var url = CreateUrlLink(user.Id, token, UrlActions.confirmEmail.ToString());
        var mailAddress = new EmailAddress { DisplayName = user.UserName, Address = user.Email };
        var message = new Message(new EmailAddress[] { mailAddress }, "Email Confirmation", Constants.GetConfirmEmailHtml(user.UserName, url), null);
        await _emailService.SendEmailAsync(message);
        return true;
    }




    ///
    /////

    public async Task<string> CreateAccessToken(ApplicationUser user)
    {
        var signingCredentials = GetSigningCredentials();
        var claims = await GetClaims(user);
        var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
        return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
    }

    public string CreateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
    {
        // TODO Reverse to minutes
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var tokenOptions = new JwtSecurityToken
         (
             issuer: jwtSettings.GetSection("ValidIssuer").Value,
             audience: jwtSettings.GetSection("ValidAudience").Value,
             claims: claims,
             expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
            signingCredentials: signingCredentials
         );
        return tokenOptions;
    }
    private async Task<List<Claim>> GetClaims(ApplicationUser user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.FullName)
         };
        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }
        return claims;
    }

    private SigningCredentials GetSigningCredentials()
    {
        var key =
                    System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value);
        var secret = new SymmetricSecurityKey(key);
        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }
    private string CreateUrlLink(string id, string token, string action)
    {
        string link = $"{_configuration["AppUrl"]}/login/{action}?id={id}&token={token}";
        return link;
    }

    public async Task<UserLoginResponse> RefreshToken(string AccessToken, string RefreshToken)
    {
        var currentToken = _db.UserRefreshTokens.FirstOrDefault(t => t.UserRefreshToken == RefreshToken);
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
        var newAccessToken = await CreateAccessToken(user);
        var newRefreshToken = CreateRefreshToken();
        // Add the new refresh token to te database.
        var newUserToken = new UserToken
        {
            UserId = user.Id
        };
        var jwtSettings = _configuration.GetSection("JwtSettings");
        newUserToken.UserRefreshToken = newRefreshToken;
        newUserToken.RefreshTokenExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.GetSection("expires").Value));
        // TODO try catch
        using var transaction = _db.Database.BeginTransaction();
        _db.UserRefreshTokens.Add(newUserToken);
        // Remove the old token from the database.
        _db.UserRefreshTokens.Remove(currentToken);
        _db.SaveChanges();
        await transaction.CommitAsync();
        await _userManager.UpdateAsync(user);
        return (new UserLoginResponse
        { AccessToken = newAccessToken, RefreshToken = newRefreshToken });

    }

    public Task<bool> RevokeLoggedInUser()
    {
        throw new NotImplementedException();
    }

    public Task<bool> ChangePassword(string oldPassword, string password, string confirmPassword)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ExtendPassword(string email, string password, string confirmPassword)
    {
        throw new NotImplementedException();
    }
}

using System.ComponentModel.DataAnnotations;
using CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
using CleanArchitecture.Application.Authentication.Commands.ValidateUser;
using CleanArchitecture.Application.Common.Models;

namespace CleanArchitecture.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<string> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    //Task<bool> CreateUserAsync(string fullName, string email, string password, string confirmPassword);

    Task<UserLoginResponse> ValidateUser(string email, string password);
    Task<UserLoginResponse> RefreshToken(string AccessToken, string RefreshToken);
    Task<bool> RevokeLoggedInUser();
    Task<bool> ChangePassword(string oldPassword, string password, string confirmPassword);
    Task<bool> ExtendPassword(string email, string password, string confirmPassword);
    Task<Result> DeleteUserAsync(string userId);

    Task<bool> SendEmailConfirmation(string Email);
    Task<bool> ReSendEmailConfirmation(string Id);
    Task<bool> ForgotPassword(string Email);
    Task<EmailConfirmResponse> ConfirmEmail(string id, string token);
}

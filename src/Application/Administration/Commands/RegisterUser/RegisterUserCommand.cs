
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Utils.EmailConfiguration;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Administration.Commands.RegisterUser;
public record RegisterUserCommand : IRequest<bool>
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; }

}

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, bool>
{
    private readonly IIdentityService _identityService;
    private readonly IEmailConfirmTokenHelper _emailConfirmToken;
    private readonly IEmailService _emailService;
    private readonly UserManager<ApplicationUser> _userManager;
    public RegisterUserCommandHandler(IIdentityService identityService,
        IEmailConfirmTokenHelper emailConfirmToken,
        IEmailService emailService,
        UserManager<ApplicationUser> userManager)
    {
        _identityService = identityService;
        _emailConfirmToken = emailConfirmToken;
        _emailService = emailService;
        _userManager = userManager;
    }


    public async Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = new ApplicationUser
        {
            FullName = request.FullName,
            Email = request.Email,
            UserName = request.Email
        };
        user.AccountCreatedDate = DateTime.Now;
        user.PwdExpiry = DateTime.Now.AddDays(90);
        user.ExpiryDate = DateTime.Now.AddYears(10);
        user.UserStatus = UserStatus.Active;
        var resultOne = await _userManager.CreateAsync(user);
        if (!resultOne.Succeeded)
        {
            throw new BadRequestException($"Failed to create user: {request.FullName}");
        }
        var resultTwo = await _userManager.AddToRoleAsync(user, request.Role);
        if (!resultTwo.Succeeded)
        {
            throw new BadRequestException($"Failed to add role: {request.Role}");
        }
        var token = await _emailConfirmToken.GenerateToken(user);
        var url = _identityService.CreateUrlLink(user.Id, token, UrlActions.confirmEmail.ToString());
        var mailAddress = new EmailAddress { DisplayName = user.UserName, Address = user.Email };
        var message = new Message(new EmailAddress[] { mailAddress }, "Email Confirmation", Constants.GetConfirmEmailHtml(user.UserName, url), null);
        await _emailService.SendEmailAsync(message);
        return true;
    }
}
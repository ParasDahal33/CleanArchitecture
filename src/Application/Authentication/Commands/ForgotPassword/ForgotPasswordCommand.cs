using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Utils.EmailConfiguration;
using CleanArchitecture.Domain.Enums;
using CleanArchitecture.Infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Authentication.Commands.ForgotPassword;
public record ForgotPasswordCommand: IRequest<bool>
{
    public string Email { get; init; } = string.Empty;
}

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, bool>
{
    private readonly IIdentityService _identityService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IEmailService _emailService;
    public ForgotPasswordCommandHandler(IIdentityService identityService,
        UserManager<ApplicationUser> userManager,
        IEmailService emailService)
    {
        _identityService = identityService;
        _userManager = userManager;
        _emailService = emailService;
    }
    public async Task<bool> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
            throw new BadRequestException("Email is empty");
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null)
            throw new NotFoundException("User not found");
        string token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var url = _identityService.CreateUrlLink(user.Id, token, UrlActions.resetpassword.ToString());
        var mailAddress = new EmailAddress { DisplayName = user.UserName, Address = user.Email };
        var message = new Message(new EmailAddress[] { mailAddress }, "Reset your password", Constants.GetForgetPasswordHtml(user.UserName, url), null);
        await _emailService.SendEmailAsync(message);
        return true;
    }
}

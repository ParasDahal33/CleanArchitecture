using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Utils.EmailConfiguration;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Authentication.Commands.ReSendEmailConfirmation;
public record ReSendEmailConfirmationCommand :IRequest<bool>
{
    public string Id { get; init; } = string.Empty;
}
public class ReSendEmailConfirmationCommandHandler : IRequestHandler<ReSendEmailConfirmationCommand, bool>
{
    private readonly IIdentityService _identityService;
    private readonly IEmailConfirmTokenHelper _emailConfirmToken;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IEmailService _emailService;
    public ReSendEmailConfirmationCommandHandler(IIdentityService identityService,
        UserManager<ApplicationUser> userManager,
        IEmailConfirmTokenHelper emailConfirmToken,
        IEmailService emailService)
    {
        _identityService = identityService;
        _userManager = userManager;
        _emailConfirmToken = emailConfirmToken;
        _emailService = emailService;
    }
    public async Task<bool> Handle(ReSendEmailConfirmationCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id);
        if (user is null)
            throw new BadRequestException("User not found");
        if (user.EmailConfirmed == true)
        {
            throw new BadRequestException("User Email already confirmed.");
        }
        var token = await _emailConfirmToken.GenerateToken(user);
        var url = _identityService.CreateUrlLink(user.Id, token, UrlActions.confirmEmail.ToString());
        var mailAddress = new EmailAddress { DisplayName = user.UserName, Address = user.Email };
        var message = new Message(new EmailAddress[] { mailAddress }, "Email Confirmation", Constants.GetConfirmEmailHtml(user.UserName, url), null);
        await _emailService.SendEmailAsync(message);
        return true;
    }
}

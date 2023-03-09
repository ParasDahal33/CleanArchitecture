using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
public record ConfirmEmailCommand : IRequest<EmailConfirmResponse>
{
    public string id { get; set; } = string.Empty;
    public string token { get; set; } = string.Empty;
}


public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, EmailConfirmResponse>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IEmailConfirmTokenHelper _emailConfirmToken;
    public ConfirmEmailCommandHandler(
        UserManager<ApplicationUser> userManager,
        IEmailConfirmTokenHelper emailConfirmToken)
    {
        _userManager = userManager;
        _emailConfirmToken = emailConfirmToken;
    }
    public async Task<EmailConfirmResponse> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.token) || string.IsNullOrWhiteSpace(request.id))
            throw new BadRequestException("Something is wrong with the link. Try it again");
        var user = await _userManager.FindByIdAsync(request.id);
        if (user is null)
            throw new NotFoundException("User not found");

        if (user.EmailConfirmed && user.PasswordHash != null)
        {
            throw new BadRequestException("Email already confirmed!");
        }
        if (await _emailConfirmToken.ConfirmEmailAction(user, request.token))
        {
            var result = new EmailConfirmResponse
            {
                Id = request.id,
                ResetToken = await _userManager.GeneratePasswordResetTokenAsync(user)
            };
            return result;
        }
        throw new BadRequestException("Failed to confirm email.");
    }
}
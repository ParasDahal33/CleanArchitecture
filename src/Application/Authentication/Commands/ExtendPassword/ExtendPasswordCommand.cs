using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Authentication.Commands.ExtendPassword;
public record ExtendPasswordCommand : IRequest<bool>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class EmailPasswordCommandHandler : IRequestHandler<ExtendPasswordCommand, bool>
{
    private readonly UserManager<ApplicationUser> _userManager;
    public EmailPasswordCommandHandler(
        UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }
    public async Task<bool> Handle(ExtendPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null)
            throw new NotFoundException("User not found");
        if (user.PwdExpiry > DateTime.Now)
            throw new BadRequestException("Your Password has not been expired yet.");
        if (request.Password != request.ConfirmPassword)
            throw new BadRequestException("Incorrect Confirm Password");
        user.PwdExpiry = DateTime.Now.AddMonths(6);
        user.PasswordChangeDate = DateTime.Now;
        var resultOne = await _userManager.UpdateAsync(user);
        var code = await _userManager.GeneratePasswordResetTokenAsync(user);
        var result = await _userManager.ResetPasswordAsync(user, code, request.Password);
        if (!result.Succeeded)
        {
            throw new BadRequestException("Attempt Unsuccessfull.");
        }
        return true;
    }
}
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

namespace CleanArchitecture.Application.Authentication.Commands.ResetPassword;
public record ResetPasswordCommand : IRequest<bool>
{
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
    public string Id { get; set; }
    public string Token { get; set; }
}

public class RequestPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, bool>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;
    private readonly IPasswordResetTokenHelper _passwordResetToken;
    public RequestPasswordCommandHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context, IPasswordResetTokenHelper passwordResetToken)
    {
        _userManager = userManager;
        _context = context;
        _passwordResetToken = passwordResetToken;
    }

    public async Task<bool> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id);
        if (user is null)
            throw new BadRequestException("User not found");
        if (user.UserStatus == UserStatus.InActive)
        {
            user.UserStatus = UserStatus.Active;
            user.PwdExpiry = DateTime.Now.AddMonths(6);
            _context.ApplicationUsers.Update(user);
        }
        user.PasswordChangeDate = DateTime.Now;
        var result = await _passwordResetToken.ResetPasswordAction(user, request.Token, request.ConfirmPassword);
        return result;
    }
}
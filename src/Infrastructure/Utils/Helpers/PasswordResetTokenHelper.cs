using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Infrastructure.Utils.Helpers;
public class PasswordResetTokenHelper : TokenHelper, IPasswordResetTokenHelper
{
    private readonly UserManager<ApplicationUser> _userManager;

    public PasswordResetTokenHelper(UserManager<ApplicationUser> userManager) : base(userManager)
    {
        _userManager = userManager;
    }

    public override async Task<string> GenerateToken(ApplicationUser user)
    {
        // FIXME: Either encrypt the password or remove this method.
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var encodedToken = TokenEncoder(token);
        return encodedToken;
    }

    public async Task<bool> ResetPasswordAction(ApplicationUser user, string token, string newPassword)
    {
        var resetPassResult = await _userManager.ResetPasswordAsync(user, token, newPassword);
        if (!resetPassResult.Succeeded)
        {
            throw new BadRequestException("Failed to change password");
            
        }
        return true;
    }
}

public interface IPasswordResetTokenHelper
{
    Task<string> GenerateToken(ApplicationUser user);
    Task<bool> ResetPasswordAction(ApplicationUser user, string token, string newPassword);
}

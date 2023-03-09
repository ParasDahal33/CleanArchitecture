using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Infrastructure.Utils.Helpers;
public class EmailConfirmTokenHelper : TokenHelper, IEmailConfirmTokenHelper
{
    private readonly UserManager<ApplicationUser> _userManager;

    public EmailConfirmTokenHelper(UserManager<ApplicationUser> userManager) : base(userManager)
    {
        _userManager = userManager;
    }

    public override async Task<string> GenerateToken(ApplicationUser user)
    {
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var encodedToken = TokenEncoder(token);
        return encodedToken;
    }

    public async Task<bool> ConfirmEmailAction(ApplicationUser user, string token)
    {
        bool flag = true;
        var decodedToken = TokenDecoder(token);
        var emailConfirmResult = await _userManager.ConfirmEmailAsync(user, decodedToken);
        if (!emailConfirmResult.Succeeded)
        {
            flag = false;
        }
        return flag;
    }
}



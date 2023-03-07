using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Infrastructure.Identity;
public class AdminService : IAdminService
{
    private readonly UserManager<ApplicationUser> _userManager;
    public AdminService(UserManager<ApplicationUser> userManager)
    {
        _userManager= userManager;
    }
    public async Task<bool> CreateUserAsync(string fullName, string email, string password, string confirmPassword)
    {
        var user = new ApplicationUser
        {
            FullName = fullName,
            Email = email,
        };
        if (password != confirmPassword)
            throw new BadRequestException("Incorrect Confirm Password");
        user.AccountCreatedDate = DateTime.Now;
        user.PwdExpiry = DateTime.Now.AddDays(90);
        user.ExpiryDate = DateTime.Now.AddYears(10);
        user.UserStatus = UserStatus.Active;
        var result = await _userManager.CreateAsync(user, password);
        if (!result.Succeeded)
        {
            throw new BadRequestException($"Failed to create user: {fullName}");
        }
        return true;
    }
}

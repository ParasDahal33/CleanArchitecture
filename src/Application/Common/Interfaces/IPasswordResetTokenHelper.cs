using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Common.Interfaces;
public interface IPasswordResetTokenHelper
{
    Task<string> GenerateToken(ApplicationUser user);
    Task<bool> ResetPasswordAction(ApplicationUser user, string token, string newPassword);
}

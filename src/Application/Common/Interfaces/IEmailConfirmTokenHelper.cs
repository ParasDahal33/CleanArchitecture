using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Infrastructure.Identity;

namespace CleanArchitecture.Application.Common.Interfaces;
public interface IEmailConfirmTokenHelper
{
    Task<string> GenerateToken(ApplicationUser user);
    Task<bool> ConfirmEmailAction(ApplicationUser user, string token);
}

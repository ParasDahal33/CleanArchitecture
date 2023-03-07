using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.Common.Interfaces;
public interface IAdminService
{
    Task<bool> CreateUserAsync(string fullName, string email, string password, string confirmPassword);
}

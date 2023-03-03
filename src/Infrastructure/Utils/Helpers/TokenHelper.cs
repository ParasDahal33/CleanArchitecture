using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace CleanArchitecture.Infrastructure.Utils.Helpers;
public abstract class TokenHelper
{

    protected TokenHelper(UserManager<ApplicationUser> userManager) { }
    protected string TokenEncoder(string token)
    {
        var encodedToken = System.Text.Encoding.UTF8.GetBytes(token);
        var validToken = WebEncoders.Base64UrlEncode(encodedToken);
        return validToken;
    }

    protected string TokenDecoder(string token)
    {
        var decodedToken = WebEncoders.Base64UrlDecode(token);
        var normalToken = System.Text.Encoding.UTF8.GetString(decodedToken);
        return normalToken;
    }

    public abstract Task<string> GenerateToken(ApplicationUser user);
}

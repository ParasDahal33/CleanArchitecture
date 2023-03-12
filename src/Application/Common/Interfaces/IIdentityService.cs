
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<string> GetUserNameAsync(string userId);
    Task<string> CreateAccessToken(ApplicationUser user);
    public string CreateRefreshToken();
    string CreateUrlLink(string id, string token, string action);
    Task<string> RoleAsync(string userId);

}

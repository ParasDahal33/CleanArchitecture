
using System.Security.Claims;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Authentication.Commands.ChangePassword;


public record ChangePasswordCommand : IRequest<bool>
{
    public string OldPassword { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;

}
public class ChangePasswordHandler : IRequestHandler<ChangePasswordCommand, bool>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    public ChangePasswordHandler(
        IHttpContextAccessor httpContextAccessor,
         UserManager<ApplicationUser> userManager
        )
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public async Task<bool> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);
        if (request.Password != request.ConfirmPassword)
        {
            throw new BadRequestException("Incorrect Confirm password");
        }
        if (user is null)
            throw new NotFoundException("User not found");
        var result = await _userManager.ChangePasswordAsync(user, request.OldPassword, request.Password);
        if (!result.Succeeded)
        {
            throw new BadRequestException("Attempt Unsuccessful");
        }
        return true;
    }
}
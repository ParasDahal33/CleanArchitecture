
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Administration.Commands.RegisterUser;
public record RegisterUserCommand : IRequest<bool>
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;

}

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, bool>
{
    private readonly UserManager<ApplicationUser> _userManager;
    public RegisterUserCommandHandler(
        UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }
  

    public async Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = new ApplicationUser
        {
            FullName = request.FullName,
            Email = request.Email,
        };
        if (request.Password != request.ConfirmPassword)
            throw new BadRequestException("Incorrect Confirm Password");
        user.AccountCreatedDate = DateTime.Now;
        user.PwdExpiry = DateTime.Now.AddDays(90);
        user.ExpiryDate = DateTime.Now.AddYears(10);
        user.UserStatus = UserStatus.Active;
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            throw new BadRequestException($"Failed to create user: {request.FullName}");
        }
        return true;
    }
}
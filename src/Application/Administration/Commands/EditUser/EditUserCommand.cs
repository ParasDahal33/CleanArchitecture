using System.Data;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Administration.Commands.EditUser;
public record EditUserCommand : IRequest<bool>
{
    public string Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public UserStatus UserStatus { get; set; } = UserStatus.Active;
    public string UserName { get; set; }
    public string Role { get; set; }

}

public class EditUserCommandHandler : IRequestHandler<EditUserCommand, bool>
{
    private readonly UserManager<ApplicationUser> _userManager;

    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IApplicationDbContext _context;
    public EditUserCommandHandler(UserManager<ApplicationUser> userManager,
        IApplicationDbContext context,
        RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _context = context;
        _roleManager = roleManager;
    }

    public async Task<bool> Handle(EditUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id);
        if (user == null)
            throw new NotFoundException("User cannot be found");
        user.FullName = request.FullName;
        user.UserName = request.UserName;
        user.Email = request.Email;
        user.UserStatus = request.UserStatus;
        await _userManager.UpdateAsync(user);
        var oldRole = await _userManager.GetRolesAsync(user);
        var result = await _userManager.RemoveFromRolesAsync(user, oldRole);
        if (!result.Succeeded)
            throw new BadRequestException("cannot remove existing role");
        var role = await _roleManager.FindByNameAsync(request.Role);
        if (role == null)
            throw new NotFoundException("Role not found.");
        result = await _userManager.AddToRoleAsync(user, role.Name);
        if (!result.Succeeded)
            throw new BadRequestException("Cannot change to selected role");
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}

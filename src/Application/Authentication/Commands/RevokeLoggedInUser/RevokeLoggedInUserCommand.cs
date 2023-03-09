using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Authentication.Commands.RevokeLoggedInUser;
public record RevokeLoggedInUserCommand : IRequest<bool>
{
}

public class RevokeLoggedInUserHandler : IRequestHandler<RevokeLoggedInUserCommand, bool>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _db;
    public RevokeLoggedInUserHandler(IHttpContextAccessor httpContextAccessor,
        UserManager<ApplicationUser> userManager,
        IApplicationDbContext db)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _db = db;
    }

    public async Task<bool> Handle(RevokeLoggedInUserCommand request, CancellationToken cancellationToken)
    {
        var userEmail = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Email);
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user is null)
            throw new NotFoundException("User not found");
        // Delete all the tokens associated with the user from the database.
        var currentUserTokens = _db.UserRefreshTokens.Where(u => u.UserId == user.Id);
        _db.UserRefreshTokens.RemoveRange(currentUserTokens);
        await _db.SaveChangesAsync(cancellationToken);
        return true;
    }
}
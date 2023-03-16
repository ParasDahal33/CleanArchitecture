using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Application.Administration.Queries.GetLoggedInUser;
public record GetLoggedInUserQuery : IRequest<GetLoggedInUserDto>;

public class GetloggedInUserQueryHandler : IRequestHandler<GetLoggedInUserQuery, GetLoggedInUserDto>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    public GetloggedInUserQueryHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _mapper = mapper;
    }
    public async Task<GetLoggedInUserDto> Handle(GetLoggedInUserQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            throw new NotFoundException("User not found.");
        var getUser = await _userManager.FindByIdAsync(user.Id);
        var getRole = await _userManager.GetRolesAsync(getUser);
        user.Role = getRole.FirstOrDefault();
        var mapUser = _mapper.Map<GetLoggedInUserDto>(user);
        return mapUser;
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace CleanArchitecture.Application.Administration.Queries.GetUsersWithPagination;
public record GetUsersWithPaginationQuery : IRequest<PaginatedList<UserDto>>
{
    public string FullName { get; set; } = "";
    public string UserId { get; set; }= null;
    public SortOrder OrderBy { get; set; }
    public string SortBy { get; set; }
    public int PageSize { get; set; } = 10;
    public int PageNumber { get; set; } = 1;

}

public class GetUsersWithPaginationQueryHandler : IRequestHandler<GetUsersWithPaginationQuery, PaginatedList<UserDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    public GetUsersWithPaginationQueryHandler(IApplicationDbContext context, 
        IMapper mapper,  UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<PaginatedList<UserDto>> Handle(GetUsersWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.ApplicationUsers.Where(u => u.FullName.ToUpper().Contains(request.FullName.ToUpper()));
        if (request.UserId != null)
        {
            query = query.Where(u => u.Id == request.UserId);
        }
        var sortedQuery = request.SortBy switch
        {
            null => query.OrderByDynamic(w => w.Id, request.OrderBy),
            _ => query.OrderByDynamic(w => EF.Property<object>(w, request.SortBy), request.OrderBy)
        };
        var users =await  sortedQuery.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToListAsync();
        foreach (var user in users)
        {
            var getUser = await _userManager.FindByIdAsync(user.Id);
            var getRole = await _userManager.GetRolesAsync(getUser);
            user.Role = getRole.FirstOrDefault();
        }
        return users.PaginatedListOne(request.PageNumber, request.PageSize); 
    }



}

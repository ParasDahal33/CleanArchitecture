using System;
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

namespace CleanArchitecture.Application.Administration.Queries.GetUsersWithPagination;
public record GetUsersWithPaginationQuery : IRequest<PaginatedList<UserDto>>
{
    public string FullName { get; set; } = "";
    public SortOrder OrderBy { get; set; }
    public string SorBy { get; set; }
    public int PageSize { get; set; } = 10;
    public int PageNumber { get; set; } = 1;

}

public class GetUsersWithPaginationQueryHandler : IRequestHandler<GetUsersWithPaginationQuery, PaginatedList<UserDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly RoleManager<ApplicationUser> _roleManager;
    public GetUsersWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper, RoleManager<ApplicationUser> roleManager)
    {
        _context = context;
        _mapper = mapper;
        _roleManager = roleManager;
    }

    public async Task<PaginatedList<UserDto>> Handle(GetUsersWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.ApplicationUsers.Where(u => u.FullName.ToUpper().Contains(request.FullName.ToUpper()));

        var sortedQuery = request.SorBy switch
        {
            null => query.OrderByDynamic(w => w.Id, request.OrderBy),
            _ => query.OrderByDynamic(w => EF.Property<object>(w, request.SorBy), request.OrderBy)
        };
        return await sortedQuery.ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize); ;

    }



}

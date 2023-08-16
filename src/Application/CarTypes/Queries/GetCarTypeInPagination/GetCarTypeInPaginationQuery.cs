using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.CarTypes.Queries.GetCarTypeInPagination;
public record GetCarTypeInPaginationQuery : IRequest<PaginatedList<CarTypeResponse>>
{
    public string Name { get; set; }
    public SortOrder OrderBy { get; set; }
    public string SortBy { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class GetCarTypeInPaginationQueryHandler : IRequestHandler<GetCarTypeInPaginationQuery, PaginatedList<CarTypeResponse>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetCarTypeInPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<PaginatedList<CarTypeResponse>> Handle(GetCarTypeInPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.CarTypes.AsQueryable();

        if (!string.IsNullOrEmpty(request.Name))
        {
            query = query.Where(u => u.TypeName.ToLower().Contains(request.Name.ToLower()));
        }
        var sortedQuery = request.SortBy switch
        {
            null => query.OrderByDynamic(w => w.Id, request.OrderBy),
            _ => query.OrderByDynamic(w => EF.Property<object>(w, request.SortBy), request.OrderBy),
        };
        return await sortedQuery
            .ProjectTo<CarTypeResponse>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}

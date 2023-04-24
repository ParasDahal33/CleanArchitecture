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

namespace CleanArchitecture.Application.Brands.Queries.GetBrandsWithPagination;
public class GetBrandsWithPaginationQuery : IRequest<PaginatedList<BrandsDto>>
{
    public string BrandName { get; set; } = "";
    public int BrandId { get; set; } = 0;
    public SortOrder OrderBy{ get; set; }
    public string SortBy { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;

}

public class GetBrandsWithPaginationQueryHandler : IRequestHandler<GetBrandsWithPaginationQuery, PaginatedList<BrandsDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetBrandsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<BrandsDto>> Handle(GetBrandsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Brands.Where(u => u.Name.ToLower().Contains(request.BrandName.ToLower()));
        if (request.BrandId != 0)
        {
            query = query.Where(u => u.Id == request.BrandId);
        }
        var sortedQuery = request.SortBy switch
        {
            null => query.OrderByDynamic(w=> w.Id, request.OrderBy),
            _ => query.OrderByDynamic(w=> EF.Property<object>(w, request.SortBy), request.OrderBy),
        };

        return await sortedQuery
            .ProjectTo<BrandsDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize); 

            
    }
}

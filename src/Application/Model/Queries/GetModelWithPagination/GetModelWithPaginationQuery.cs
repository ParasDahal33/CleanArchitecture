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

namespace CleanArchitecture.Application.Model.Queries.GetModelWithPagination;
public record GetModelWithPaginationQuery : IRequest<PaginatedList<CarModelResponse>>
{
    public string ModelName { get; set; }
    public SortOrder OrderBy { get; set; }
    public string SortBy { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class GetModelWithPaginationQueryHandler : IRequestHandler<GetModelWithPaginationQuery, PaginatedList<CarModelResponse>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetModelWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }
    public async Task<PaginatedList<CarModelResponse>> Handle(GetModelWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.CarModels.AsQueryable();
        if (!string.IsNullOrEmpty(request.ModelName))
            query = query.Where(u => u.ModelName.ToLower().Contains(request.ModelName.ToLower()));
        var sortedQuery = request.SortBy switch
        {
            null => query.OrderByDynamic(w => w.Id, request.OrderBy),
            _ => query.OrderByDynamic(w => EF.Property<object>(w, request.SortBy), request.OrderBy),
        };
        return await sortedQuery
            .ProjectTo<CarModelResponse>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}

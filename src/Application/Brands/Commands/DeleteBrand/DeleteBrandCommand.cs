using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Events.BrandEvents;
using MediatR;

namespace CleanArchitecture.Application.Brands.Commands.DeleteBrand;
public record DeleteBrandCommand(int Id) : IRequest<Unit>;

public class DelteBrandCommandHandler : IRequestHandler<DeleteBrandCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    public DelteBrandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Brands
            .FindAsync(new object[] { request.Id }, cancellationToken);
        if(entity == null)
            throw new NotFoundException(nameof(Brand), request.Id);
        _context.Brands.Remove(entity);
        entity.AddDomainEvent(new BrandDeletedEvent(entity));
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}

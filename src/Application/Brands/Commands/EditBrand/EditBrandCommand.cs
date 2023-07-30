using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Brands.Commands.EditBrand;
public record EditBrandCommand : IRequest<Unit>
{
    public int Id { get; set; }

    public string Name { get; set; }
}

public class EditBrandCommandHandler : IRequestHandler<EditBrandCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public EditBrandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(EditBrandCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Brands
            .FindAsync(new object[] { request.Id }, cancellationToken);
        if (entity == null)
            throw new NotFoundException(nameof(Brand), request.Id);
        entity.Name = request.Name;
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
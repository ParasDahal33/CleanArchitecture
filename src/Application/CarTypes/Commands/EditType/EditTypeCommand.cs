using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.CarTypes.Commands.EditType;
public class EditTypeCommand : IRequest<Unit>
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class EditTypeCommandHandler : IRequestHandler<EditTypeCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    public EditTypeCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Unit> Handle(EditTypeCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.CarTypes.FindAsync(new object[] { request.Id }, cancellationToken);
        if (entity == null)
            throw new NotFoundException(nameof(CarType), request.Id);
        entity.TypeName = request.Name;
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Events.TypeEvent;
using MediatR;

namespace CleanArchitecture.Application.CarTypes.Commands.DeleteType;
public record DeleteTypeCommand(int Id): IRequest<Unit>;

public class DeleteTypeCommandHandler : IRequestHandler<DeleteTypeCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    public DeleteTypeCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Unit> Handle(DeleteTypeCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.CarTypes
            .FindAsync(new object[] { request.Id }, cancellationToken);
        if (entity == null)
            throw new NotFoundException(nameof(CarType), request.Id);
        _context.CarTypes.Remove(entity);
        entity.AddDomainEvent(new TypeDeletedEvent(entity));
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}

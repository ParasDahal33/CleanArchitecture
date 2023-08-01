using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Events.TypeEvent;
using MediatR;

namespace CleanArchitecture.Application.Type.Commands.AddType;
public class AddTypeCommand : IRequest<Unit>
{
    public string Name{ get; set; }
}

public class AddTypeCommandHandler : IRequestHandler<AddTypeCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    public AddTypeCommandHandler(IApplicationDbContext context)
    {
        _context = context;    
    }
    public async Task<Unit> Handle(AddTypeCommand request, CancellationToken cancellationToken)
    {
        var entity = new CarType
        {
            TypeName = request.Name
        };
        await _context.CarTypes.AddAsync(entity);
        await _context.SaveChangesAsync(cancellationToken);
        entity.AddDomainEvent(new TypeAddedEvent(entity));
        return Unit.Value;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Events.ModelEvents;
using MediatR;

namespace CleanArchitecture.Application.Model.Commands.AddModel;
public record AddModelCommand : IRequest<Unit>
{
    public string Name { get; init; }
    public Brand Brands { get; init; }
    public CarType Types { get; init; }
}

public class AddModelCommandHandler : IRequestHandler<AddModelCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public AddModelCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Unit> Handle(AddModelCommand request, CancellationToken cancellationToken)
    {
        var entity = new CarModel
        {
            ModelName = request.Name,
            Brands = request.Brands,
            Types = request.Types,
        };
        entity.AddDomainEvent(new ModelAddedEvent(entity));
        await _context.CarModels.AddAsync(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}

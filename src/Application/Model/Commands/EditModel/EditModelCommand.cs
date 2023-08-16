using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Model.Commands.EditModel;
public record EditModelCommand(int Id) : IRequest<Unit>
{
    public string  Name{ get; init; }
    public Brand Brands { get; init; }
    public CarType Types { get; init; }

}

public class EditModelCommandHandler : IRequestHandler<EditModelCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public EditModelCommandHandler(IApplicationDbContext context)
    {
        _context = context; 
    }
    public async Task<Unit> Handle(EditModelCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.CarModels.FindAsync(new object[] { request.Id }, cancellationToken);
        if (entity == null)
            throw new NotFoundException(nameof(CarModel), request.Id);
        entity.ModelName = request.Name;
        entity.Brands = request.Brands;
        entity.Types = request.Types;
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Model.Commands.DeleteModel;
public record DeleteModelCommand : IRequest<Unit>
{
    public int Id { get; set; }
}

public class DeleteModelCommandHandler : IRequestHandler<DeleteModelCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    public DeleteModelCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Unit> Handle(DeleteModelCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.CarModels
            .FindAsync(new object[] { request.Id }, cancellationToken);
        if (entity == null)
            throw new NotFoundException(nameof(CarModel), request.Id);
        _context.CarModels.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}

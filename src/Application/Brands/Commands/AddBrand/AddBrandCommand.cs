﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Events.BrandEvents;
using MediatR;

namespace CleanArchitecture.Application.Brands.Commands.AddBrand;
public record AddBrandCommand : IRequest<string>
{
    public string Name { get; init; }
}

public class AddBrandCommandHandler : IRequestHandler<AddBrandCommand, string>
{
    private readonly IApplicationDbContext _context;
    public AddBrandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> Handle(AddBrandCommand request, CancellationToken cancellationToken)
    {
        var entity = new Brand
        {
            Name = request.Name
        };
        entity.AddDomainEvent(new BrandsAddedEvent(entity));
        _context.Brands.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return ($"Brand {entity.Name} created successfully.");
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Brands.Commands.EditBrand;
public class EditBrandCommand : IRequest<string>
{
    public int Id { get; set; }

    public string Name { get; set; }
}

public class EditBrandCommandHandler : IRequestHandler<EditBrandCommand, string>
{
    private readonly IApplicationDbContext _context;

    public EditBrandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> Handle(EditBrandCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Brands
            .FindAsync(new object[] { request.Id }, cancellationToken);
        if (entity == null)
            throw new NotFoundException(nameof(Brand), request.Id);
        entity.Name = request.Name;
        await _context.SaveChangesAsync(cancellationToken);
        return ($"Brand with id {request.Id} updated successfully.");
    }
}
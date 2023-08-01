using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanArchitecture.Application.Type.Commands.AddType;
public class AddTypeCommandValidator : AbstractValidator<AddTypeCommand>
{
    public AddTypeCommandValidator() 
    {
        RuleFor(v => v.Name)
            .MaximumLength(256)
            .NotEmpty();
    }
}

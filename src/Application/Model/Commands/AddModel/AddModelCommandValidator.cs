using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanArchitecture.Application.Model.Commands.AddModel;
public class AddModelCommandValidator : AbstractValidator<AddModelCommand>
{
    public AddModelCommandValidator()
    {
        RuleFor(v => v.Name)
            .MaximumLength(256)
            .NotEmpty();

        RuleFor(v => v.Brands)
            .NotEmpty();

        RuleFor(v => v.Types)
            .NotEmpty();
    }
}

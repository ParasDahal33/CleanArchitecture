using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanArchitecture.Application.Model.Commands.EditModel;
public class EditModelCommandValidator : AbstractValidator<EditModelCommand>
{
    public EditModelCommandValidator()
    {
        RuleFor(v => v.Id)
            .NotEmpty();
        RuleFor(v => v.Name)
            .NotEmpty()
            .MaximumLength(256);
        RuleFor(v => v.Brands)
            .NotEmpty();
        RuleFor(v => v.Types)
            .NotEmpty();
    }
}

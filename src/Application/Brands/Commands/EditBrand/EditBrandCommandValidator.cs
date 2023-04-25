using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanArchitecture.Application.Brands.Commands.EditBrand;
public class EditBrandCommandValidator : AbstractValidator<EditBrandCommand>
{
    public EditBrandCommandValidator()
    {
        RuleFor(v => v.Name)
            .MaximumLength(256)
            .NotEmpty();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanArchitecture.Application.Brands.Commands.AddBrand;
public class AddBrandCommandValidator : AbstractValidator<AddBrandCommand>
{
    public AddBrandCommandValidator()
    {
        RuleFor(v => v.Name)
            .MaximumLength(256)
            .NotEmpty();
    }
}

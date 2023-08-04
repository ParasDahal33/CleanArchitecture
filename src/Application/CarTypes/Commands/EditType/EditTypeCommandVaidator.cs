using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanArchitecture.Application.CarTypes.Commands.EditType;
public class EditTypeCommandVaidator : AbstractValidator<EditTypeCommand>
{
    public  EditTypeCommandVaidator()
    {
        RuleFor(v => v.Name)
            .MaximumLength(256)
            .NotEmpty();
        RuleFor(v => v.Id)
            .NotEmpty();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using FluentValidation;

namespace CleanArchitecture.Application.Administration.Commands.RegisterUser;
public class RegisterUserCommandValidator:AbstractValidator<RegisterUserCommand>
{
    private readonly IAdminService _adminService;
    public RegisterUserCommandValidator(IAdminService adminService)
    {
        _adminService = adminService;
        RuleFor(v => v.Email)
            .NotEmpty().WithMessage("Email is required.")
            .MaximumLength(200).WithMessage("Email must not exceed 200 characters.")
            .EmailAddress().WithMessage("Incorrect Email format");
        RuleFor(v => v.Password)
            .NotEmpty().WithMessage("Password is required")
            .MaximumLength(20).WithMessage("Password must not exceed 20 characters");
        RuleFor(v => v.FullName)
            .NotEmpty().WithMessage("Full Name is requried")
            .MaximumLength(256).WithMessage("Full Name must not exceed 256 characters. ");
    }
}

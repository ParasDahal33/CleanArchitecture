using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;

namespace CleanArchitecture.Application.Administration.Commands.RegisterUser;
public record RegisterUserCommand : IRequest<bool>
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;

}

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, bool>
{
    private readonly IAdminService _adminService;
    public RegisterUserCommandHandler(IAdminService adminService)
    {
        _adminService = adminService;
    }
  

    public Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var response = _adminService.CreateUserAsync(request.FullName,request.Email,request.Password,request.ConfirmPassword);
        return response;
    }
}
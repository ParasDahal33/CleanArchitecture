using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Security;
using MediatR;

namespace CleanArchitecture.Application.Authentication.Commands.ChangePassword;

[Authorize]
public record ChangePasswordCommand : IRequest<bool>
{
    public string OldPassword { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;

}
public class ChangePasswordHandler : IRequestHandler<ChangePasswordCommand, bool>
{
    private readonly IIdentityService _identyService;
    public ChangePasswordHandler(IIdentityService identyService)
    {
        _identyService = identyService;
    }

    public Task<bool> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var response = _identyService.ChangePassword(request.OldPassword, request.Password, request.ConfirmPassword);
        return response;
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;

namespace CleanArchitecture.Application.Authentication.Commands.ForgotPassword;
public record ForgotPasswordCommand: IRequest<bool>
{
    public string Email { get; init; } = string.Empty;
}

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, bool>
{
    private readonly IIdentityService _identityService;
    public ForgotPasswordCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;

    }
    public Task<bool> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        var response = _identityService.ForgotPassword(request.Email);
        return response;
    }
}

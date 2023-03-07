using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;

namespace CleanArchitecture.Application.Authentication.Commands.ExtendPassword;
public record ExtendPasswordCommand : IRequest<bool>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class EmailPasswordCommandHandler : IRequestHandler<ExtendPasswordCommand, bool>
{
    private readonly IIdentityService _identityService;
    public EmailPasswordCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public Task<bool> Handle(ExtendPasswordCommand request, CancellationToken cancellationToken)
    {
        var response = _identityService.ExtendPassword(request.Email, request.Password, request.ConfirmPassword);
        return response;
    }
}
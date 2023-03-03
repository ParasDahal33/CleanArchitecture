using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;

namespace CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
public record ConfirmEmailCommand : IRequest<EmailConfirmResponse>
{
    public string id { get; set; } = string.Empty;
    public string token { get; set; } = string.Empty;
}


public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, EmailConfirmResponse>
{
    private readonly IIdentityService _identityService;
    public ConfirmEmailCommandHandler(IIdentityService identityService)
    {
        _identityService= identityService;
    }
    public Task<EmailConfirmResponse> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        var response = _identityService.ConfirmEmail(request.id, request.token);
        return response;
    }
}
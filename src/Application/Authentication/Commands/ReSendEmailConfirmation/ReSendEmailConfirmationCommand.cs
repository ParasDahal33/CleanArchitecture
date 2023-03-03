using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;

namespace CleanArchitecture.Application.Authentication.Commands.ReSendEmailConfirmation;
public record ReSendEmailConfirmationCommand :IRequest<bool>
{
    public string Id { get; init; } = string.Empty;
}
public class ReSendEmailConfirmationCommandHandler : IRequestHandler<ReSendEmailConfirmationCommand, bool>
{
    private readonly IIdentityService _identityService;
    public ReSendEmailConfirmationCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public Task<bool> Handle(ReSendEmailConfirmationCommand request, CancellationToken cancellationToken)
    {
        var response = _identityService.ReSendEmailConfirmation(request.Id);
        return response;
    }
}

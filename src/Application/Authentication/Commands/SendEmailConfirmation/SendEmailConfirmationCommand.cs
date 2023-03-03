using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;

namespace CleanArchitecture.Application.Authentication.Commands.SendEmailConfirmation;

public record SendEmailConfirmationCommand : IRequest<bool>
{
    public string Email { get; init; } = string.Empty;
}

public class SendEmailConfirmationCommandHandler : IRequestHandler<SendEmailConfirmationCommand, bool>
{
    private readonly IIdentityService _identityService;
    public SendEmailConfirmationCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public Task<bool> Handle(SendEmailConfirmationCommand request, CancellationToken cancellationToken)
    {
        var response = _identityService.SendEmailConfirmation(request.Email);
        return response;
    }
}
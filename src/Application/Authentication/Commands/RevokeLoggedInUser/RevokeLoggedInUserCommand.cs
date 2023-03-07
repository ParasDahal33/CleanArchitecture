using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Security;
using MediatR;

namespace CleanArchitecture.Application.Authentication.Commands.RevokeLoggedInUser;
[Authorize]
public record RevokeLoggedInUserCommand : IRequest<bool>
{
}

public class RevokeLoggedInUserHandler : IRequestHandler<RevokeLoggedInUserCommand, bool>
{
    private readonly IIdentityService _identityService;
    public RevokeLoggedInUserHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public Task<bool> Handle(RevokeLoggedInUserCommand request, CancellationToken cancellationToken)
    {
        return _identityService.RevokeLoggedInUser();
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Authentication.Commands.ValidateUser;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using MimeKit.Cryptography;

namespace CleanArchitecture.Application.Authentication.Commands.RefreshToken;
public record RefreshTokenCommand : IRequest<UserLoginResponse>
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, UserLoginResponse>
{
    private readonly IIdentityService _identityService;
    public RefreshTokenCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public Task<UserLoginResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var response = _identityService.RefreshToken(request.AccessToken, request.RefreshToken);
        return response;
    }
}

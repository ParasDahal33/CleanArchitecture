using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TodoLists.Commands.CreateTodoList;
using MediatR;

namespace CleanArchitecture.Application.Authentication.Commands.ValidateUser;
public record ValidateUserCommand : IRequest<UserLoginResponse>
{
    public string Email { get; init; }
    public string Password { get; init; }
}

public class ValidateUserCommandHandler : IRequestHandler<ValidateUserCommand, UserLoginResponse>
{
    private readonly IIdentityService _identyService;
    public ValidateUserCommandHandler(IIdentityService identityService)
    {
        _identyService = identityService;
    }
    public Task<UserLoginResponse> Handle(ValidateUserCommand request, CancellationToken cancellationToken)
    {
        var response = _identyService.ValidateUser(request.Email, request.Password);
        return response;
    }
}


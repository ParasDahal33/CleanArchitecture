using CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
using CleanArchitecture.Application.Authentication.Commands.ForgotPassword;
using CleanArchitecture.Application.Authentication.Commands.ReSendEmailConfirmation;
using CleanArchitecture.Application.Authentication.Commands.SendEmailConfirmation;
using CleanArchitecture.Application.Authentication.Commands.ValidateUser;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.Common.Security;
using CleanArchitecture.Application.TodoLists.Commands.CreateTodoList;
using CleanArchitecture.WebUI.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;
[Route("api/[controller]")]
[Produces("application/json")]
[ApiController]
public class AuthController : ApiControllerBase
{
    private readonly IIdentityService _identityService;
    public AuthController(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    
    [HttpPost("create-user")]
    public async Task<ActionResult<(Result Result, string UserId)>> CreateUserAsync(string userName, string password)
    {
        var response = await _identityService.CreateUserAsync(userName, password);
        if (response.Result.Succeeded == false)
        {
            return BadRequest(response.Result);
        }
        return response;
    }

    [HttpPost("user-login")]
    public async Task<ActionResult<UserLoginResponse>> Create(ValidateUserCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPost("send-email-confirmation")]
    public async Task<ActionResult<bool>> SendEmailConfirmation(SendEmailConfirmationCommand command)
    { 
        return await Mediator.Send(command);
    }

    [HttpPost("resend-email-confirmation")]
    public async Task<ActionResult<bool>> ReSendEmailConfirmation(ReSendEmailConfirmationCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpGet("confirm-email")]
    public async Task<ActionResult<EmailConfirmResponse>> ConfirmEmail(ConfirmEmailCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPost("forgot-password")]
    public async Task<ActionResult<bool>> ForgotPassword(ForgotPasswordCommand command)
    {
        return await Mediator.Send(command);
    }
}

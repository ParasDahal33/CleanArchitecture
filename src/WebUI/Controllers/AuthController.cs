using CleanArchitecture.Application.Authentication.Commands.ConfirmEmail;
using CleanArchitecture.Application.Authentication.Commands.ForgotPassword;
using CleanArchitecture.Application.Authentication.Commands.RefreshToken;
using CleanArchitecture.Application.Authentication.Commands.ReSendEmailConfirmation;
using CleanArchitecture.Application.Authentication.Commands.RevokeLoggedInUser;
using CleanArchitecture.Application.Authentication.Commands.SendEmailConfirmation;
using CleanArchitecture.Application.Authentication.Commands.ValidateUser;
using CleanArchitecture.Application.TodoLists.Commands.CreateTodoList;
using Microsoft.AspNetCore.Authorization;
using CleanArchitecture.WebUI.Controllers;
using Microsoft.AspNetCore.Mvc;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.Authentication.Commands.ChangePassword;
using CleanArchitecture.Application.Authentication.Commands.ExtendPassword;

namespace WebUI.Controllers;

[Route("api/[controller]")]
[Produces("application/json")]
[ApiController]
public class AuthController : ApiControllerBase
{

    [HttpPost("user-login")]
    public async Task<ActionResult<UserLoginResponse>> Login(ValidateUserCommand command)
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

    [HttpPost("refresh-token")]
    public async Task<ActionResult<UserLoginResponse>>RefreshToken(RefreshTokenCommand command)
    {
        return await Mediator.Send(command);
    }

    
    [HttpPost("revoke-loggedIn-user")]
    [Authorize]
    public async Task<ActionResult<bool>>RevokeLoggedInUser(RevokeLoggedInUserCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task <ActionResult<bool>> ChangePassword(ChangePasswordCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPost("extend-password")]
    [Authorize]
    public async Task<ActionResult<bool>> ExtendPassword(ExtendPasswordCommand command)
    {
        return await Mediator.Send(command);
    }
}

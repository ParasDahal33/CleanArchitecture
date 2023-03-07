using CleanArchitecture.Application.Administration.Commands.RegisterUser;
using CleanArchitecture.Application.Authentication.Commands.ValidateUser;
using CleanArchitecture.WebUI.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;
[Route("api/[controller]")]
[Produces("application/json")]
[ApiController]
public class AdminController : ApiControllerBase
{
    [HttpPost("register-user")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<bool>> RegisterUser(RegisterUserCommand command)
    {
        return await Mediator.Send(command);
    }
}

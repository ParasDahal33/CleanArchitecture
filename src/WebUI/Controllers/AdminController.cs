using CleanArchitecture.Application.Administration.Commands.DeleteUser;
using CleanArchitecture.Application.Administration.Commands.EditUser;
using CleanArchitecture.Application.Administration.Commands.RegisterUser;
using CleanArchitecture.Application.Administration.Queries.GetLoggedInUser;
using CleanArchitecture.Application.Administration.Queries.GetUsersWithPagination;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.WebUI.Controllers;
using MediatR;
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
    [HttpGet("get-users")]
    public async Task<ActionResult<PaginatedList<UserDto>>> GetUsers([FromQuery] GetUsersWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPut("edit-user")]
    //[Authorize(Roles = "Admin")]
    public async Task<ActionResult<bool>> EditUser(EditUserCommand command)
    {
        return await Mediator.Send(command);

    }

    [Authorize]
    [HttpGet("get-loggedIn-user")]
    public async Task<ActionResult<GetLoggedInUserDto>> GetLoggdInUser([FromQuery] GetLoggedInUserQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpDelete("delete-user")]
    //[Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> DeletUser(DeleteUserCommand command)
    {
        return await Mediator.Send(command);

    }
}

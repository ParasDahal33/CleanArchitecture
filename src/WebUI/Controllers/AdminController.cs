using CleanArchitecture.Application.Administration.Commands.RegisterUser;
using CleanArchitecture.Application.Administration.Queries.GetUsersWithPagination;
using CleanArchitecture.Application.Common.Models;
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
    [HttpGet("get-users")]
    public async Task<ActionResult<PaginatedList<UserDto>>> GetUsers([FromQuery] GetUsersWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }
}

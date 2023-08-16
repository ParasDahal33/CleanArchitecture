using CleanArchitecture.Application.CarTypes.Commands.AddType;
using CleanArchitecture.Application.CarTypes.Commands.DeleteType;
using CleanArchitecture.Application.CarTypes.Commands.EditType;
using CleanArchitecture.Application.CarTypes.Queries.GetCarTypeInPagination;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.WebUI.Controllers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;
[Route("api/type")]
[Produces("application/json")]
[ApiController]
public class CarTypeController : ApiControllerBase
{
    [HttpPost("add-type")]
    [Authorize(Roles ="Admin")]
    public async Task<ActionResult<Unit>>CreateCarType(AddTypeCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpPut("edit-type")]
    [Authorize(Roles ="Admin")]
    public async Task<ActionResult<Unit>> EditCarType(EditTypeCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpDelete("delete-type")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> DeleteCarType(DeleteTypeCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpGet("get-type")]
    public async Task<ActionResult<PaginatedList<CarTypeResponse>>> GetCarType([FromQuery]GetCarTypeInPaginationQuery query)
    {
        return await Mediator.Send(query);
    }
}

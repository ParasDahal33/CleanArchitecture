using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.Model.Commands.AddModel;
using CleanArchitecture.Application.Model.Commands.DeleteModel;
using CleanArchitecture.Application.Model.Commands.EditModel;
using CleanArchitecture.Application.Model.Queries.GetModelWithPagination;
using CleanArchitecture.WebUI.Controllers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;

[Route("api/models")]
[Produces("application/json")]
[ApiController]
public class CarModelController : ApiControllerBase
{
    [HttpPost("add-model")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> CreateModel(AddModelCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> UpdateModel(EditModelCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> DeleteModel(DeleteModelCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpGet("get-model")]
    public async Task<ActionResult<PaginatedList<CarModelResponse>>> GetModelWithPagination([FromQuery] GetModelWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }

}

using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.Model.Commands.AddModel;
using CleanArchitecture.Application.Model.Commands.EditModel;
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
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> Create(AddModelCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> Update(EditModelCommand command)
    {
        return await Mediator.Send(command);
    }

    //public async Task<ActionResult<PaginatedList<>>>

}

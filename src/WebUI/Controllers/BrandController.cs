using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CleanArchitecture.Application.Brands.Commands.AddBrand;
using CleanArchitecture.WebUI.Controllers;
using CleanArchitecture.Application.Brands.Commands.EditBrand;
using CleanArchitecture.Application.Brands.Commands.DeleteBrand;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.Brands.Queries.GetBrandsWithPagination;

namespace WebUI.Controllers;
[Route("api/[controller]")]
[ApiController]
[Produces("application/json")]
public class BrandController : ApiControllerBase
{

    [HttpPost("add-brand")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> AddBrand(AddBrandCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> EditBrand(EditBrandCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Unit>> DeleteBrand(DeleteBrandCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpGet("get-brands")]
    [Authorize]
    public async Task<ActionResult<PaginatedList<BrandsDto>>> GetBrands([FromQuery] GetBrandsWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }
}

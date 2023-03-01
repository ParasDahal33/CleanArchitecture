using CleanArchitecture.Application.Authentication;
using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.WebUI.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers;
[Route("api/[controller]")]
//[Produces("application/json")]
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

    [HttpPost("login-user")]
    public async Task<ActionResult<UserLoginResponse>> Login(string email, string password)
    {
        try {
            var response = await _identityService.ValidateUser(email, password);
            return response;
        }

        catch(BadRequestException ex)
        {
            return BadRequest($"{ex.Message}");
        }
        catch(Exception ex)
        {
           return BadRequest(ex.Message);
        }
      
    }
}

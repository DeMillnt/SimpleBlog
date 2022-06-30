using Application.Const;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Auth;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp(SignUpRequest request)
        {
            return Ok(await _authService.SignUp(request));
        }

        [HttpGet("sign-in")]
        public async Task<IActionResult> SignIn(SignInRequest request)
        {
            return Ok(await _authService.SignIn(request));
        }
    }
}

using Application.Const;
using Application.DTOs.Auth;
using Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthService(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> rolManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = rolManager;
            _configuration = configuration;
        }

        public async Task<AuthResponse> SignIn(SignInRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user is null)
            {
                throw new Exception($"user {request.UserName} already exists");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var claims = GetClaims(request.UserName, user.Id, roles.ToList());

            return new()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(GetToken(claims))
            };
        }

        public async Task<AuthResponse> SignUp(SignUpRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user != null)
            {
                throw new Exception($"User with name ${request.UserName} already exists");
            }

            var newUser = new IdentityUser(request.UserName);
            var result = await _userManager.CreateAsync(newUser, request.Password);

            if (!result.Succeeded)
            {
                throw new Exception(result.ToString());
            }


            var roles = new List<string>() { Roles.User };
            var claims = GetClaims(request.UserName, newUser.Id, roles);

            return new()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(GetToken(claims))
            };
        }

        private List<Claim> GetClaims(string userName, string userId, List<string> roles)
        {
            var claims = new List<Claim>
            {
                    new Claim(ClaimTypes.Name, userName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, userId)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}

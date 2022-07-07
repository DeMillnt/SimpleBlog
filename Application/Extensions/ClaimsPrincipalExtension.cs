using System.Security.Claims;

namespace Infrastructure.Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static string GetUserID(this ClaimsPrincipal User)
        {
            return User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;            
        }
    }
}

using Application.Const;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Seed
{
    public class Seeder
    {
        public async Task Seed(RoleManager<IdentityRole> roleManager)
        {
            foreach (var role in Roles.GetRoles())
            {
                if (await roleManager.FindByNameAsync(role) == null)
                {
                    await roleManager.CreateAsync(new(role));
                }
            }
        }
    }
}

using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=db;Port=5432;Database=simpleBlogDb;Username=postgres;Password=password");
        }
    }
}

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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Post>()
                .HasOne<IdentityUser>()
                .WithMany()
                .HasForeignKey(p => p.UserId);

            builder.Entity<Post>()
                .Property(p => p.CreatedDate)
                .HasColumnType("datetime2")
                .HasPrecision(0);
        }
    }
}

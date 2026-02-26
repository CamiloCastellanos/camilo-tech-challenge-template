using backend.Model;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace backend.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> User { get; set; }
        public DbSet<Menu> Menu { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "Admin", Email = "Admin@admin.com", Password = "123457", Image = "", UserType = UserType.Admin }
            );
            modelBuilder.Entity<Menu>().HasData(
                new Menu { Id = 1, Text = "Home", Page = "/", Icon = "" }
            );
        }

    }
}

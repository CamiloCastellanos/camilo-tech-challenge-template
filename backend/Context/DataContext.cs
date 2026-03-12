using backend.Model;
using Microsoft.EntityFrameworkCore;

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
                new User { Id = 1, Name = "Admin", Email = "Admin@admin.com", Password = "123457", Image = "https://randomuser.me/api/portraits/women/70.jpg", UserType = UserType.Admin },
                new User { Id = 2, Name = "User", Email = "User@user.com", Password = "123457", Image = "https://randomuser.me/api/portraits/women/7.jpg", UserType = UserType.User }
            );
            modelBuilder.Entity<Menu>().HasData(
                new Menu { Id = 1, Text = "Home", Page = "/", Icon = "home" },
                new Menu { Id = 2, Text = "User", Page = "/user", Icon = "gear" }
            );
        }

    }
}

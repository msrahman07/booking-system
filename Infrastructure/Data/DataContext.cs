using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Guest> Guests { get; set; } = null!;
        public DbSet<Staff> Staffs { get; set; } = null!;
        public DbSet<Service> Services { get; set; } = null!;
        public DbSet<Appointment> Appointments { get; set; } = null!;
        
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     var configuration = new ConfigurationBuilder()
        //         .SetBasePath(Directory.GetCurrentDirectory())
        //         .AddJsonFile("appsettings.json")
        //         .Build();
        //     var connStr = configuration.GetConnectionString("DefaultConnection");
        //     optionsBuilder.UseMySQL(connStr!);
        // }
    }
}
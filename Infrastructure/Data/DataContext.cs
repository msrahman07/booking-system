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
        
        // protected override async void OnModelCreating(ModelBuilder builder)
        // {
        //     base.OnModelCreating(builder);

        //     // builder.Entity<Appointment>(x => x.HasKey(a => new {a.GuestId, a.StaffId, a.ServiceId}));
        //     builder.Entity<Appointment>()
        //         .HasOne(a => a.Guest)
        //         .WithMany(g => g.Appointments)
        //         // .HasForeignKey(a => a.GuestId)
        //         .OnDelete(DeleteBehavior.Cascade);
            
        //     builder.Entity<Appointment>()
        //         .HasOne(a => a.Staff)
        //         .WithMany(s => s.Appointments)
        //         // .HasForeignKey(a => a.StaffId)
        //         .OnDelete(DeleteBehavior.Cascade);

        //     builder.Entity<Appointment>()
        //         .HasOne(a => a.Service);
        // }

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
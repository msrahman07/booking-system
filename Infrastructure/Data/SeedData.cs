using Core.Entities;

namespace Infrastructure.Data
{
    public static class SeedData
    {
        public static async Task Seed(DataContext context)
        {
            if (!context.Guests.Any())
            {
                var guest1 = new Guest
                {
                    FirstName = "Paula",
                    LastName = " Thompson",
                    Phone = "111-111-1111",
                    Email = "paula@test.com"
                };
                var guest2 = new Guest
                {
                    FirstName = "Tim",
                    LastName = " Lightner",
                    Phone = "111-111-2222",
                    Email = "tim@test.com"
                };
                var guest3 = new Guest
                {
                    FirstName = "Michael",
                    LastName = " Doherty",
                    Phone = "111-111-3333",
                    Email = "michael@test.com"
                };
                var guest4 = new Guest
                {
                    FirstName = "Susan",
                    LastName = " Carlson",
                    Phone = "111-111-4444",
                    Email = "susan@test.com"
                };
                await context.Guests.AddRangeAsync(guest1, guest2, guest3, guest4);
                await context.SaveChangesAsync();
            }
            if (!context.Staffs.Any())
            {
                var staff1 = new Staff
                {
                    FirstName = "Alicia",
                    LastName = "Pierce",
                    JobTitle = "Manager"
                };
                var staff2 = new Staff
                {
                    FirstName = "Ronald",
                    LastName = "Klain",
                    JobTitle = "Hair Stylist"
                };

                await context.Staffs.AddRangeAsync(staff1, staff2);
                await context.SaveChangesAsync();
            }
            if (!context.Services.Any())
            {
                var service1 = new Service
                {
                    Name = "Mens Haircut",
                    Category = "Haircut",
                    Price = 20
                };
                var service2 = new Service
                {
                    Name = "Womens Haircut",
                    Category = "Haircut",
                    Price = 20
                };
                var service3 = new Service
                {
                    Name = "Color",
                    Category = "Color",
                    Price = 40
                };

                await context.Services.AddRangeAsync(service1, service2, service3);
                await context.SaveChangesAsync();
            }
        }
    }
}
using Core.Entities;

namespace Infrastructure.Data
{
    public static class SeedData
    {
        public static async Task Seed(DataContext context)
        {
            if(!context.Guests.Any())
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
        }
    }
}
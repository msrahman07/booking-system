using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GuestRepository : IGuestRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public GuestRepository(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Guest> AddGuestAsync(Guest guest)
        {
            await context.Guests.AddAsync(guest);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? guest : null!;
        }

        public async Task<string> DeleteGuestAsync(int id)
        {
            var guest = await context.Guests.FindAsync(id);
            if(guest == null) return "Guest with id doesn't exist";
            context.Guests.Remove(guest);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? "Success" : "Unable to delete guest";
        }

        public async Task<Guest> GetGuestByIdAsync(int id)
        {
            var guest = await context.Guests.FirstOrDefaultAsync(g => g.Id == id);

            return guest ?? null!;
        }

        public async Task<IReadOnlyList<Guest>> GetGuestsAsync()
        {
            return await context.Guests.ToListAsync();
        }

        public async Task<Guest> UpdateGuestAsync(Guest guest)
        {
            var guestToUpdate = await context.Guests.FirstOrDefaultAsync(g => g.Id == guest.Id);
            if(guestToUpdate == null) return null!;
            mapper.Map(guest, guestToUpdate);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? guestToUpdate : null!;
        }
    }
}
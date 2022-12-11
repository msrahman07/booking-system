using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GuestRepository : GenericRepository<Guest, GuestDto>, IGenericRepository<Guest, GuestDto>
    {
        public GuestRepository(DataContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override async Task<IReadOnlyList<GuestDto>> ListAsync()
        {
            var items = await context.Guests
                .Include(g => g.Appointments)
                .ThenInclude(a => a.Service)
                .Include(g => g.Appointments)
                .ThenInclude(a => a.Staff)
                .ToListAsync();
            return (items != null) ? mapper.Map<IReadOnlyList<Guest>, IReadOnlyList<GuestDto>>(items) : null!;
        }

        public override async Task<GuestDto> GetByIdAsync(int id)
        {
            var item = await context.Guests
                .Include(g => g.Appointments)
                .ThenInclude(a => a.Service)
                .Include(g => g.Appointments)
                .ThenInclude(a => a.Staff)
                .FirstOrDefaultAsync(x => x.Id == id);

            return (item != null) ? mapper.Map<Guest, GuestDto>(item) : null!;
        }        
    }
}
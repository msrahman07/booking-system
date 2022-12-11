using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class StaffRepository : GenericRepository<Staff, StaffDto>, IGenericRepository<Staff, StaffDto>
    {
        public StaffRepository(DataContext context, IMapper mapper) : base(context, mapper)
        {
        }
        public override async Task<IReadOnlyList<StaffDto>> ListAsync()
        {
            var items = await context.Staffs
                .Include(s => s.Appointments)
                .ThenInclude(a => a.Service)
                .Include(s => s.Appointments)
                .ThenInclude(a => a.Guest)
                .ToListAsync();
            return (items != null) ? mapper.Map<IReadOnlyList<Staff>, IReadOnlyList<StaffDto>>(items) : null!;
        }

        public override async Task<StaffDto> GetByIdAsync(int id)
        {
            var item = await context.Staffs
                .Include(s => s.Appointments)
                .ThenInclude(a => a.Service)
                .Include(s => s.Appointments)
                .ThenInclude(a => a.Guest)
                .FirstOrDefaultAsync(x => x.Id == id);

            return (item != null) ? mapper.Map<Staff, StaffDto>(item) : null!;
        }
    }
}
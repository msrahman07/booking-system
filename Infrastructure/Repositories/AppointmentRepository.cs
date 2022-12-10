using AutoMapper;
using Core.AppServices;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public AppointmentRepository(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ResponseResult<AppointmentDto>> AddAppointmentAsync(AppointmentDto appointment)
        {
            var guest = await context.Guests.FirstOrDefaultAsync(g => g.Id == appointment.GuestId);
            var service = await context.Services.FirstOrDefaultAsync(s => s.Id == appointment.ServiceId);
            var staff = await context.Staffs.FirstOrDefaultAsync(s => s.Id == appointment.StaffId);
            
            if(guest == null) return ResponseResult<AppointmentDto>.Failure("Guest doesn't exist");
            if(service == null) return ResponseResult<AppointmentDto>.Failure("Service doesn't exist");
            if(staff == null) return ResponseResult<AppointmentDto>.Failure("Staff doesn't exist");

            var newAppointment = new Appointment 
            {
                Guest = guest,
                Service = service,
                Staff = staff
            };
            await context.Appointments.AddAsync(newAppointment);
            var result = await context.SaveChangesAsync() > 0;
            
            return (result) ? ResponseResult<AppointmentDto>.Success(mapper.Map<Appointment, AppointmentDto>(newAppointment)) 
                : ResponseResult<AppointmentDto>.Failure("Unable to create appointment");
        }

        public Task<string> DeleteAppointmentAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<AppointmentDto> GetAppointmentByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<AppointmentDto>> GetAppointmentsAsync()
        {
            var appointments = await context.Appointments
                .Include(a => a.Guest)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .ToListAsync();
            return mapper.Map<IReadOnlyList<Appointment>, IReadOnlyList<AppointmentDto>>(appointments);
        }

        public Task<AppointmentDto> UpdateAppointmentAsync(AppointmentDto appointment)
        {
            throw new NotImplementedException();
        }
    }
}
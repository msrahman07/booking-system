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

        public async Task<ResponseResult<AppointmentResponseDto>> AddAppointmentAsync(AppointmentRequestDto appointment)
        {
            //Validate appointment time
            var appointmentStartTime = new TimeSpan(appointment.StartTime.Hours, appointment.StartTime.Minutes, appointment.StartTime.Seconds);
            var appointmentEndTime = new TimeSpan(appointment.EndTime.Hours, appointment.EndTime.Minutes, appointment.EndTime.Seconds);
            if (appointmentStartTime >= appointmentEndTime) return ResponseResult<AppointmentResponseDto>.Failure("Invalid appointment time, please select end time later than start time");

            var guest = await GetGuestWithAppointments(appointment);
            var service = await context.Services.FirstOrDefaultAsync(s => s.Id == appointment.ServiceId);
            var staff = await GetStaffWithAppointments(appointment);

            if (guest == null) return ResponseResult<AppointmentResponseDto>.Failure("Guest doesn't exist");
            if (service == null) return ResponseResult<AppointmentResponseDto>.Failure("Service doesn't exist");
            if (staff == null) return ResponseResult<AppointmentResponseDto>.Failure("Staff doesn't exist");

            // Validate Guest and Staff Availability
            if (staff.Appointments.Count() > 0) return ResponseResult<AppointmentResponseDto>.Failure($"Staff {staff.FirstName} is not available at given time");
            if (guest.Appointments.Count() > 0) return ResponseResult<AppointmentResponseDto>.Failure($"Customer {guest.FirstName} is not available at given time");

            var newAppointment = new Appointment
            {
                Guest = guest,
                Service = service,
                Staff = staff,
                Date = appointment.Date.Date,
                StartTime = appointmentStartTime,
                EndTime = appointmentEndTime
            };
            await context.Appointments.AddAsync(newAppointment);
            var result = await context.SaveChangesAsync() > 0;

            return (result) ? ResponseResult<AppointmentResponseDto>.Success(mapper.Map<Appointment, AppointmentResponseDto>(newAppointment))
                : ResponseResult<AppointmentResponseDto>.Failure("Unable to create appointment");
        }

        public async Task<ResponseResult<string>> DeleteAppointmentAsync(int id)
        {
            var appointment = await context.Appointments.FirstOrDefaultAsync(a => a.Id == id);
            if (appointment == null) return ResponseResult<string>.Failure("AppointmentToUpdate doesn't exist");
            context.Appointments.Remove(appointment);
            var result = await context.SaveChangesAsync() > 0;

            return (result) ? ResponseResult<string>.Success("Deleted")
                : ResponseResult<string>.Failure("Unable to Delete appointment");
        }

        public async Task<ResponseResult<AppointmentResponseDto>> GetAppointmentByIdAsync(int id)
        {
            var appointment = await context.Appointments
                .Include(a => a.Guest)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .FirstOrDefaultAsync(a => a.Id == id);
            if (appointment == null) return ResponseResult<AppointmentResponseDto>.Failure("AppointmentToUpdate doesn't exist");
            return ResponseResult<AppointmentResponseDto>.Success(mapper.Map<Appointment, AppointmentResponseDto>(appointment));
        }

        public async Task<IReadOnlyList<AppointmentResponseDto>> GetAppointmentsAsync()
        {
            var appointments = await context.Appointments
                .Include(a => a.Guest)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .ToListAsync();
            return mapper.Map<IReadOnlyList<Appointment>, IReadOnlyList<AppointmentResponseDto>>(appointments);
        }

        public async Task<ResponseResult<AppointmentResponseDto>> UpdateAppointmentAsync(AppointmentRequestDto appointment)
        {
            //Validate appointment time
            var appointmentStartTime = new TimeSpan(appointment.StartTime.Hours, appointment.StartTime.Minutes, appointment.StartTime.Seconds);
            var appointmentEndTime = new TimeSpan(appointment.EndTime.Hours, appointment.EndTime.Minutes, appointment.EndTime.Seconds);
            if (appointmentStartTime >= appointmentEndTime) return ResponseResult<AppointmentResponseDto>.Failure("Invalid appointment time, please select end time later than start time");

            var appointmentToUpdate = await context.Appointments.FirstOrDefaultAsync(a => a.Id == appointment.Id);
            if (appointmentToUpdate == null) return ResponseResult<AppointmentResponseDto>.Failure("Appointment doesn't exist");

            if (appointmentToUpdate.Guest.Id != appointment.GuestId)
            {
                var guest = await GetGuestWithAppointments(appointment);
                if (guest == null) return ResponseResult<AppointmentResponseDto>.Failure("Guest doesn't exist");
                // Validate Staff Availability
                if (guest.Appointments.Count() > 0) return ResponseResult<AppointmentResponseDto>.Failure($"Customer {guest.FirstName} is not available at given time");
                appointmentToUpdate.Guest = guest;
            }
            if (appointmentToUpdate.Service.Id != appointment.ServiceId)
            {
                var service = await context.Services.FirstOrDefaultAsync(s => s.Id == appointment.ServiceId);
                if (service == null) return ResponseResult<AppointmentResponseDto>.Failure("Service doesn't exist");
                appointmentToUpdate.Service = service;
            }
            if (appointmentToUpdate.Staff.Id != appointment.StaffId)
            {
                var staff = await GetStaffWithAppointments(appointment);
                if (staff == null) return ResponseResult<AppointmentResponseDto>.Failure("Staff doesn't exist");
                // Validate Staff Availability
                if (staff.Appointments.Count() > 0) return ResponseResult<AppointmentResponseDto>.Failure($"Staff {staff.FirstName} is not available at given time");
                appointmentToUpdate.Staff = staff;
            }
            appointmentToUpdate.Date = appointment.Date;
            appointmentToUpdate.StartTime = new TimeSpan(appointment.StartTime.Hours, appointment.StartTime.Minutes, appointment.StartTime.Seconds);
            appointmentToUpdate.EndTime = new TimeSpan(appointment.EndTime.Hours, appointment.EndTime.Minutes, appointment.EndTime.Seconds);
            var result = await context.SaveChangesAsync() > 0;

            return (result) ? ResponseResult<AppointmentResponseDto>.Success(mapper.Map<Appointment, AppointmentResponseDto>(appointmentToUpdate))
                : ResponseResult<AppointmentResponseDto>.Failure("Unable to update appointment");
        }

        async Task<IReadOnlyList<AppointmentResponseDto>> IAppointmentRepository.GetAppointmentsByDateAsync(DateTime date)
        {
            var appointments = await context.Appointments
                .Include(a => a.Guest)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .Where(a => a.Date == date)
                .ToListAsync();
            return mapper.Map<IReadOnlyList<Appointment>, IReadOnlyList<AppointmentResponseDto>>(appointments);
        }

        private async Task<Guest> GetGuestWithAppointments(AppointmentRequestDto appointment)
        {
            var appointmentStartTime = new TimeSpan(appointment.StartTime.Hours, appointment.StartTime.Minutes, appointment.StartTime.Seconds);
            var appointmentEndTime = new TimeSpan(appointment.EndTime.Hours, appointment.EndTime.Minutes, appointment.EndTime.Seconds);
            var guest = await context.Guests
                    .Include(s => s.Appointments)
                                    // .Where(a => a.Date == appointment.Date && a.Id != appointment.Id)
                                    // .Where(a =>
                                    //     (appointmentStartTime >= a.StartTime && appointmentStartTime <= a.EndTime) ||
                                    //     (appointmentEndTime >= a.StartTime && appointmentEndTime <= a.EndTime)
                                    // ))
                    .FirstOrDefaultAsync(g => g.Id == appointment.GuestId);
            return guest ?? null!;
        }
        private async Task<Staff> GetStaffWithAppointments(AppointmentRequestDto appointment)
        {
            var appointmentStartTime = new TimeSpan(appointment.StartTime.Hours, appointment.StartTime.Minutes, appointment.StartTime.Seconds);
            var appointmentEndTime = new TimeSpan(appointment.EndTime.Hours, appointment.EndTime.Minutes, appointment.EndTime.Seconds);
            var staff = await context.Staffs
                    .Include(s => s.Appointments
                                    .Where(a => a.Date == appointment.Date && a.Id != appointment.Id)
                                    .Where(a =>
                                        (appointmentStartTime >= a.StartTime && appointmentStartTime <= a.EndTime) ||
                                        (appointmentEndTime >= a.StartTime && appointmentEndTime <= a.EndTime)
                                    ))
                    .FirstOrDefaultAsync(s => s.Id == appointment.StaffId);
            return staff ?? null!;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.AppServices;
using Core.DTOs;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<IReadOnlyList<AppointmentDto>> GetAppointmentsAsync();
        Task<AppointmentDto> GetAppointmentByIdAsync(int id);
        Task<ResponseResult<AppointmentDto>> AddAppointmentAsync(AppointmentDto appointment);
        Task<AppointmentDto> UpdateAppointmentAsync(AppointmentDto appointment);
        Task<string> DeleteAppointmentAsync(int id);
    }
}
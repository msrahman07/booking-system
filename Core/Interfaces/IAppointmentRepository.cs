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
        Task<IReadOnlyList<AppointmentResponseDto>> GetAppointmentsAsync();
        Task<ResponseResult<AppointmentResponseDto>> GetAppointmentByIdAsync(int id);
        Task<ResponseResult<AppointmentResponseDto>> AddAppointmentAsync(AppointmentRequestDto appointment);
        Task<ResponseResult<AppointmentResponseDto>> UpdateAppointmentAsync(AppointmentRequestDto appointment);
        Task<ResponseResult<string>> DeleteAppointmentAsync(int id);
    }
}
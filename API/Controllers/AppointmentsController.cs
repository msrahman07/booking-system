using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentsController : BaseApiController
    {
        private readonly IAppointmentRepository appointmentRepo;

        public AppointmentsController(IAppointmentRepository appointmentRepo)
        {
            this.appointmentRepo = appointmentRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppointmentResponseDto>>> GetAppointmentsList()
        {
            return Ok(await appointmentRepo.GetAppointmentsAsync());
        }
        
        [HttpGet("{date}")]
        public async Task<ActionResult<IReadOnlyList<AppointmentResponseDto>>> GetAppointmentsList(DateTime date)
        {
            return Ok(await appointmentRepo.GetAppointmentsByDateAsync(date));
        }

        [HttpPost]
        public async Task<ActionResult<AppointmentResponseDto>> AddNewAppointment(AppointmentRequestDto appointment)
        {
            var newAppointment = await appointmentRepo.AddAppointmentAsync(appointment);
            return (newAppointment != null) ? HandleResult(newAppointment) : BadRequest("Unable to create new appointment");
        }
    }
}
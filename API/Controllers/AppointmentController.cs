using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentController : BaseApiController
    {
        private readonly IAppointmentRepository appointmentRepo;

        public AppointmentController(IAppointmentRepository appointmentRepo)
        {
            this.appointmentRepo = appointmentRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppointmentDto>>> GetAppointmentsList()
        {
            return Ok(await appointmentRepo.GetAppointmentsAsync());
        }

        [HttpPost]
        public async Task<ActionResult<AppointmentDto>> AddNewAppointment(AppointmentDto appointment)
        {
            var newAppointment = await appointmentRepo.AddAppointmentAsync(appointment);
            return (newAppointment != null) ? HandleResult(newAppointment) : BadRequest("Unable to create new appointment");
        }
    }
}
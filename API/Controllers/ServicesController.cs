using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ServicesController : BaseApiController
    {
        private readonly IGenericRepository<Service, ServiceDto> serviceRepo;

        public ServicesController(IGenericRepository<Service, ServiceDto> serviceRepo)
        {
            this.serviceRepo = serviceRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ServiceDto>>> GetAllServices()
        {
            return Ok(await serviceRepo.ListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDto>> GetServiceById(int id)
        {
            var service = await serviceRepo.GetByIdAsync(id);
            return  (service != null) ? service : NotFound("Service not found");
        }

        [HttpPost]
        public async Task<ActionResult<ServiceDto>> AddNewService(Service service)
        {
            var newService = await serviceRepo.AddAsync(service);
            return  (newService != null) ? newService : BadRequest("Unable to create new Service");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteService(int id)
        {
            var result = await serviceRepo.DeleteAsync(id);
            return  result;
        } 

        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceDto>> UpdateService(int id, Service service)
        {
            service.Id = id;
            var result = await serviceRepo.UpdateAsync(service);
            return  (result != null) ? result : BadRequest("Unable to update Service");
        } 
    }
}
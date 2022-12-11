using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StaffsController : BaseApiController
    {
        private readonly IGenericRepository<Staff, StaffDto> staffRepo;

        public StaffsController(IGenericRepository<Staff, StaffDto> staffRepo)
        {
            this.staffRepo = staffRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<StaffDto>>> GetAllStaffs()
        {
            return Ok(await staffRepo.ListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StaffDto>> GetStaffById(int id)
        {
            var staff = await staffRepo.GetByIdAsync(id);
            return  (staff != null) ? staff : NotFound("Guest not found");
        }

        [HttpPost]
        public async Task<ActionResult<StaffDto>> AddNewStaff(Staff staff)
        {
            var newStaff = await staffRepo.AddAsync(staff);
            return  (newStaff != null) ? newStaff : BadRequest("Unable to create new guest");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteStaff(int id)
        {
            var result = await staffRepo.DeleteAsync(id);
            return  result;
        } 

        [HttpPut("{id}")]
        public async Task<ActionResult<StaffDto>> UpdateStaff(int id, Staff staff)
        {
            staff.Id = id;
            var result = await staffRepo.UpdateAsync(staff);
            return  (result != null) ? result : BadRequest("Unable to update guest");
        } 
    }
}
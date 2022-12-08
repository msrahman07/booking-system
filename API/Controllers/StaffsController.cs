using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StaffsController : BaseApiController
    {
        private readonly IGenericRepository<Staff> staffRepo;

        public StaffsController(IGenericRepository<Staff> staffRepo)
        {
            this.staffRepo = staffRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Staff>>> GetAllStaffs()
        {
            return Ok(await staffRepo.ListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStaffById(int id)
        {
            var staff = await staffRepo.GetByIdAsync(id);
            return  (staff != null) ? staff : NotFound("Guest not found");
        }

        [HttpPost]
        public async Task<ActionResult<Staff>> AddNewStaff(Staff staff)
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
        public async Task<ActionResult<Staff>> UpdateStaff(int id, Staff staff)
        {
            staff.Id = id;
            var result = await staffRepo.UpdateAsync(staff);
            return  (result != null) ? result : BadRequest("Unable to update guest");
        } 
    }
}
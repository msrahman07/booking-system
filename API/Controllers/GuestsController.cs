using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GuestsController : BaseApiController
    {
        private readonly IGenericRepository<Guest> guestRepo;

        public GuestsController(IGenericRepository<Guest> guestRepo)
        {
            this.guestRepo = guestRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Guest>>> GetAllGuests()
        {
            return Ok(await guestRepo.ListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Guest>> GetGuestById(int id)
        {
            var guest = await guestRepo.GetByIdAsync(id);
            return  (guest != null) ? guest : NotFound("Guest not found");
        }

        [HttpPost]
        public async Task<ActionResult<Guest>> AddNewGuest(Guest guest)
        {
            var newGuest = await guestRepo.AddAsync(guest);
            return  (newGuest != null) ? newGuest : BadRequest("Unable to create new guest");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteGuest(int id)
        {
            var result = await guestRepo.DeleteAsync(id);
            return  result;
        } 

        [HttpPut("{id}")]
        public async Task<ActionResult<Guest>> UpdateGuest(int id, Guest guest)
        {
            guest.Id = id;
            var result = await guestRepo.UpdateAsync(guest);
            return  (result != null) ? result : BadRequest("Unable to update guest");
        } 
        // public GuestsController(IGenericRepository<Guest> repo) : base(repo)
        // {
        // }
    }
}
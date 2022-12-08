using Core.Entities;

namespace Core.Interfaces
{
    public interface IGuestRepository
    {
        Task<IReadOnlyList<Guest>> GetGuestsAsync();
        Task<Guest> GetGuestByIdAsync(int id);
        Task<Guest> AddGuestAsync(Guest guest);
        Task<Guest> UpdateGuestAsync(Guest guest);
        Task<string> DeleteGuestAsync(int id);
    }
}
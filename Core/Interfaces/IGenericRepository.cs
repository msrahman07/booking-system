using Core.DTOs;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IGenericRepository<T, TDto> 
        where T : BaseEntity
        where TDto : BaseDto
    {
        Task<IReadOnlyList<TDto>> ListAsync();
        Task<TDto> GetByIdAsync(int id);
        Task<TDto> AddAsync(T t);
        Task<TDto> UpdateAsync(T t);
        Task<string> DeleteAsync(int id);
    }
}
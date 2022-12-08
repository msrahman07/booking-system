using Core.Entities;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> ListAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> AddAsync(T t);
        Task<T> UpdateAsync(T t);
        Task<string> DeleteAsync(int id);
    }
}
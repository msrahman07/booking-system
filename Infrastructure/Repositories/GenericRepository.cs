using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GenericRepository<T, TDto> : IGenericRepository<T, TDto> 
        where T : BaseEntity
        where TDto : BaseDto

    {
        protected readonly DataContext context;
        protected readonly IMapper mapper;

        public GenericRepository(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<TDto> AddAsync(T t)
        {
            await context.Set<T>().AddAsync(t);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? mapper.Map<T, TDto>(t) : null!;
        }

        public async Task<string> DeleteAsync(int id)
        {
            var item = await context.Set<T>().FindAsync(id);
            if(item == null) return "Id doesn't exist";
            context.Set<T>().Remove(item);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? "success" : "Unable to delete";
        }

        public virtual async Task<TDto> GetByIdAsync(int id)
        {
            var item = await context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);

            return (item != null) ? mapper.Map<T, TDto>(item) : null!;
        }

        public virtual async Task<IReadOnlyList<TDto>> ListAsync()
        {
            var items = await context.Set<T>().ToListAsync();
            return (items != null) ? mapper.Map<IReadOnlyList<T>, IReadOnlyList<TDto>>(items) : null!;
        }

        public async Task<TDto> UpdateAsync(T item)
        {
            var itemToUpdate = await context.Set<T>().FirstOrDefaultAsync(x => x.Id == item.Id);
            if(itemToUpdate == null) return null!;
            mapper.Map(item, itemToUpdate);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? mapper.Map<T, TDto>(itemToUpdate) : null!;
        }
    }
}
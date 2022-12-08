using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity

    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public GenericRepository(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<T> AddAsync(T t)
        {
            await context.Set<T>().AddAsync(t);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? t : null!;
        }

        public async Task<string> DeleteAsync(int id)
        {
            var item = await context.Set<T>().FindAsync(id);
            if(item == null) return "Id doesn't exist";
            context.Set<T>().Remove(item);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? "success" : "Unable to delete";
        }

        public async Task<T> GetByIdAsync(int id)
        {
            var item = await context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);

            return item ?? null!;
        }

        public async Task<IReadOnlyList<T>> ListAsync()
        {
            return await context.Set<T>().ToListAsync();
        }

        public async Task<T> UpdateAsync(T item)
        {
            var itemToUpdate = await context.Set<T>().FirstOrDefaultAsync(x => x.Id == item.Id);
            if(itemToUpdate == null) return null!;
            mapper.Map(item, itemToUpdate);
            var result = await context.SaveChangesAsync() > 0;
            return (result) ? itemToUpdate : null!;
        }
    }
}
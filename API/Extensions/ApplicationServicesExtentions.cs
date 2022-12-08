using API.Services;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.AppServices;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace API.Extensions
{
    public static class ApplicationServicesExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddSwaggerGen();
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddSingleton<IDesignTimeServices, MysqlEntityFrameworkDesignTimeServices>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddDbContext<DataContext>(options =>
            {
                var connStr = config.GetConnectionString("DefaultConnection");
                // options.UseMySql(connStr, ServerVersion.AutoDetect(connStr)); // for pomelo
                options.UseMySQL(connStr!);
            });
            return services;
        }
    }
}
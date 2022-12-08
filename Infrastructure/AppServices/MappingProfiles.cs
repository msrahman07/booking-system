using AutoMapper;
using Core.Entities;

namespace Infrastructure.AppServices
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Guest, Guest>();
            CreateMap<Staff, Staff>();
            CreateMap<Service, Service>();
        }
    }
}
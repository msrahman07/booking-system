using AutoMapper;
using Core.DTOs;
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
            CreateMap<Appointment, AppointmentDto>()
                .ForMember(d => d.GuestId, o => o.MapFrom(s => s.Guest.Id))
                .ForMember(d => d.ServiceId, o => o.MapFrom(s => s.Service.Id))
                .ForMember(d => d.StaffId, o => o.MapFrom(s => s.Staff.Id));
        }
    }
}
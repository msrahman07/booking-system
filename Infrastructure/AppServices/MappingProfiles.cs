using AutoMapper;
using Core.AppServices;
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
            CreateMap<Appointment, AppointmentResponseDto>()
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Date.ToString("MM/dd/yyyy")))
                .ForMember(d => d.GuestFullName, o => o.MapFrom(s => s.Guest.FirstName + " "+ s.Guest.LastName))
                .ForMember(d => d.GuestId, o => o.MapFrom(s => s.Guest.Id))
                .ForMember(d => d.ServiceName, o => o.MapFrom(s => s.Service.Name))
                .ForMember(d => d.ServiceId, o => o.MapFrom(s => s.Service.Id))
                .ForMember(d => d.StaffFullName, o => o.MapFrom(s => s.Staff.FirstName + " "+ s.Staff.LastName))
                .ForMember(d => d.StaffId, o => o.MapFrom(s => s.Staff.Id));
            CreateMap<Guest, GuestDto>();
            CreateMap<Staff, StaffDto>();
            CreateMap<Service, ServiceDto>();

        }
    }
}
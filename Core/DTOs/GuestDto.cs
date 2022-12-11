namespace Core.DTOs
{
    public class GuestDto : BaseDto
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        
        public string Phone { get; set; } = null!;
        
        public string Email { get; set; } = null!;
        public IReadOnlyList<AppointmentResponseDto> Appointments { get; set; } = new List<AppointmentResponseDto>();
        
    }
}
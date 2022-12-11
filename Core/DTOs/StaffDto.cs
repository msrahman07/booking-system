namespace Core.DTOs
{
    public class StaffDto : BaseDto
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string JobTitle { get; set; } = null!;
        public IReadOnlyList<AppointmentResponseDto> Appointments { get; set; } = new List<AppointmentResponseDto>();
        
    }
}
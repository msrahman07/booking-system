namespace Core.DTOs
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public int GuestId { get; set; }
        public int ServiceId { get; set; }
        public int StaffId { get; set; }
    }
}
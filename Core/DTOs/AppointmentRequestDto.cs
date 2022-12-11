using System.Text.Json.Serialization;
using Core.AppServices;

namespace Core.DTOs
{
    public class AppointmentRequestDto
    {
        public int Id { get; set; }
        public int GuestId { get; set; }
        public int ServiceId { get; set; }
        public int StaffId { get; set; }
        public DateTime Date { get; set; }= new DateTime();
        
        public CustomerTimeSpan StartTime { get; set; } = null!;
        
        public CustomerTimeSpan EndTime { get; set; } = null!;
    }

    public class CustomerTimeSpan 
    {
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Second { get; set; } = 0;
    }
}
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
        public bool Completed { get; set; } = false;

        public DateTime Date { get; set; }= new DateTime();
        
        public CustomTimeSpan StartTime { get; set; } = null!;
        
        public CustomTimeSpan EndTime { get; set; } = null!;
    }

    public class CustomTimeSpan 
    {
        public int Hours { get; set; }
        public int Minutes { get; set; }
        public int Seconds { get; set; } = 0;
    }
}
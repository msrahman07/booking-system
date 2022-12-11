using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class AppointmentResponseDto
    {
        public int Id { get; set; }
        public int GuestId { get; set; }
        public string GuestFullName { get; set; } = null!;
        public int ServiceId { get; set; }
        public string ServiceName { get; set; } = null!;
        public int StaffId { get; set; }
        public string StaffFullName { get; set; } = null!;
        public string Date { get; set; } = null!;
        
        public TimeSpan StartTime { get; set; }
        
        public TimeSpan EndTime { get; set; }
    }
}
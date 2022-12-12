using System.Text.Json.Serialization;
using Core.AppServices;

namespace Core.Entities
{
    public class Appointment : BaseEntity
    {
        // public int GuestId { get; set; }
        public Guest Guest { get; set; } = null!;
        // public int ServiceId { get; set; }
        public Service Service { get; set; } = null!;
        // public int StaffId { get; set; }
        public Staff Staff { get; set; } = null!;
        public bool Completed { get; set; } = false;
        public DateTime Date { get; set; } = new DateTime();
        
        [JsonConverter(typeof(TimeSpanJsonConverter))]
        public TimeSpan StartTime { get; set; } = new TimeSpan();
        
        [JsonConverter(typeof(TimeSpanJsonConverter))]
        public TimeSpan EndTime { get; set; } = new TimeSpan();
    }
}
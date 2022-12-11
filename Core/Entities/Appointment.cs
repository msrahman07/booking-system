using System.Text.Json.Serialization;
using Core.AppServices;

namespace Core.Entities
{
    public class Appointment : BaseEntity
    {
        public Guest Guest { get; set; } = null!;
        public Service Service { get; set; } = null!;
        public Staff Staff { get; set; } = null!;

        public DateTime Date { get; set; } = new DateTime();
        
        [JsonConverter(typeof(TimeSpanJsonConverter))]
        public TimeSpan StartTime { get; set; } = new TimeSpan();
        
        [JsonConverter(typeof(TimeSpanJsonConverter))]
        public TimeSpan EndTime { get; set; } = new TimeSpan();
    }
}
namespace Core.Entities
{
    public class Appointment : BaseEntity
    {
        public Guest Guest { get; set; } = null!;
        public Service Service { get; set; } = null!;
        public Staff Staff { get; set; } = null!;
    }
}
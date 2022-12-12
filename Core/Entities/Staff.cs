namespace Core.Entities
{
    public class Staff : BaseEntity
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string JobTitle { get; set; } = null!;
        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
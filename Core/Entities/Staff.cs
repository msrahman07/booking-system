namespace Core.Entities
{
    public class Staff : BaseEntity
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string JobTitle { get; set; } = null!;
        public IReadOnlyList<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
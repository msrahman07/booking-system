namespace Core.Entities
{
    public class Service : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string Category { get; set; } = null!;
        public decimal Price { get; set; } = 0M;
    }
}
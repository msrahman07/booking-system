using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class Guest : BaseEntity
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        
        [RegularExpression(@"^\d{3}-\d{3}-\d{4}$",
            ErrorMessage = "Phone number must be in 111-111-1111 format")]
        public string Phone { get; set; } = null!;
        
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; } = null!;
        
    }
}
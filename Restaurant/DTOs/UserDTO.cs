using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Restaurant.DTOs
{
    public class UserDTO
    {
        [Required]
        public string Name { get; set; }

        public string? Surname { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }

        [Column(TypeName = "Date")]
        public DateTime Birthday { get; set; }

        public int? RoleId { get; set; }

        public string? Status { get; set; }
        public DateTime ContractDueDate { get; set; }

        // Additional fields for login response
        public int Id { get; set; }
    }
}

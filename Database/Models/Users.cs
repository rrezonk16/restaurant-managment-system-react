using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class Users : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

        public string? PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }

        public int? RoleId { get; set; }

        [ForeignKey("RoleId")]
        public Roles Role { get; set; } // Navigation property to Role

        [Column(TypeName = "Date")]
        public DateTime? Birthday { get; set; }

        [Column(TypeName = "Date")]
        public DateTime? ContractDueDate { get; set; }
    }
}

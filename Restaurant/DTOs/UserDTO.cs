using Database.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurant.DTOs
{
    public class UserDTO
    {
        [Required]
        public string Name { get; set; }

        public string? Surname { get; set; }

        public String? Email { get; set; }

        public String? PhoneNumber { get; set; }

        [Required]
        public String Password { get; set; }

        [Column(TypeName = "Date")]
        public DateTime Birthday { get; set; }

        public int? RoleId { get; set; } 

        public String? Status { get; set; }
        public DateTime ContractDueDate { get; set; }
    }
}
 
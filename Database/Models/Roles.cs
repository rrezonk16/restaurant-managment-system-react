using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class Roles : BaseModel
    {
        [Required]
        public string Name { get; set; }

        // Navigation property to users
        public ICollection<Users> Users { get; set; }
    }
}

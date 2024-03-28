using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class Menu : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public int ChefId { get; set; }  // Foreign key property

        [ForeignKey("ChefId")]
        public Users User { get; set; }  // Navigation property
    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class Restaurant : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [ForeignKey("Manager")]
        public int? ManagerId { get; set; }
        public Users Manager { get; set; }

        [Required]
        public string OpenHours { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Restaurant.DTOs
{
    public class RoleDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string AllowedPages { get; set; } // Store as a comma-separated string
    }
}

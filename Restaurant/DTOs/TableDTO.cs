using System.ComponentModel.DataAnnotations;

namespace Restaurant.DTOs
{
    public class TableDTO
    {
        [Required]
        public int TableID { get; set; } // Add this property

        [Required]
        public int RestaurantID { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public int NumberOfSeats { get; set; }
    }
}

using Database.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Restaurant.DTOs
{
    public class ReservationDTO
    {
        [Required]
        public DateTime ReservationDate { get; set; }

        public int ClientId { get; set; }

        public int RestaurantId { get; set; }

        public int TableId { get; set; }

        public string? Status { get; set; }
        public int NumberOfSeats { get; set; }

        public int Hour { get; set; }
    }
}

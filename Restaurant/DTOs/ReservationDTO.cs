using Database.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Restaurant.DTOs
{
    public class ReservationDTO
    {
        public int ID{ get; set; }
        public int UserID { get; set; }
        public int RestaurantId { get; set; }
    }
}

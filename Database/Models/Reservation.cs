using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class Reservation : BaseModel
    {
        [Required]
        public DateTime ReservationDate { get; set; }
        [Required]
        public int Hour { get;set; }
        [Required]
        public int NumberOfSeats { get; set; }

        public int ClientId { get; set; }

        [ForeignKey("ClientId")]
        public Users Client { get; set; } // Navigation property

        public int RestaurantId { get; set; }

        [ForeignKey("RestaurantId")]
        public Restaurants Restaurant { get; set; } // Navigation property

        public int TableId { get; set; }

        [ForeignKey("TableId")]
        public Table Table { get; set; } // Navigation property

        public string? Status { get; set; }


    }

}

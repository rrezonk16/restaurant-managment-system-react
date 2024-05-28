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
        public int ID { get; set; }

        [Required]
        public int UserID {  get; set; }

        [Required]
        [ForeignKey("Restaurant")]
        public int RestaurantId { get; set; }

        // Navigation property for the related restaurant
        public Restaurants Restaurant { get; set; }
    }

}

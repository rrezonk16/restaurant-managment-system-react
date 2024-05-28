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
    public class TableDTO
    {
        [Required]
        public int RestaurantID { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public int NumberOfSeats { get; set; }
    }
}
 
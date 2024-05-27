using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public class Table : BaseModel
    {
        [Required]
        int RestaurantID { get; set; }

        [Required]
        string Status { get; set; }

        [Required]
        int Seats { get; set; }
    }

}

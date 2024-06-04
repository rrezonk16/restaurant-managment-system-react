using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurant.DTOs
{
    public class OrderDTO
    {
        [Required]
        public int Price { get; set; }

        [Required]
        public string Status { get; set; }

        public int[] ItemsIDs { get; set; }

        public int TableId { get; set; }
        public int userID { get; set; }

    }
}
 
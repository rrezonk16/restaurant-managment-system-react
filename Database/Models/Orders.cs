using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class Orders : BaseModel
    {
        [Required]
        public int Price { get; set; }

        [Required]
        public string Status { get; set; }

       public int ItemsID { get; set; }

        //public int TableId { get; set; }
    }
}

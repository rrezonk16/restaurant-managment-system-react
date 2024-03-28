using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class MenuItems : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Ingredients { get; set; }

        public int MenuID { get; set; } 

        [ForeignKey("MenuID")]
        public Menu Menu { get; set; }  
    }
}

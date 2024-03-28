using Database.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Restaurant.DTOs
{
    public class MenuItemsDTO
    {
        public string Name { get; set; }

        [Required]
        public string Ingredients { get; set; }

        public int MenuID { get; set; }  

    }
}
 
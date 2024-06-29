using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class Orders : BaseModel
    {
        [Required]
        public string Status { get; set; }
        public string MenuItemIds { get; set; }

        public int TableId { get; set; }
        public Table Table { get; set; }

        public int userID { get; set; }
        public Users User { get;set; }
    }
}

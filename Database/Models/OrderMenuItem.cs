using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class OrderMenuItem : BaseModel
    {
       public int OrderId { get; set; }
       public Orders Order { get; set; }

       public int MenuItemId { get; set; }
       public MenuItems MenuItem { get; set; }
        
    }
}
﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurant.DTOs
{
    public class MenuDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
      
        public int ChefId { get; set; }  

    }
}
 
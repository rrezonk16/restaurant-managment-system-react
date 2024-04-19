using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Mappings
{
    public static class MenuMapper
    {
        public static Menu MenuDTOToModel(MenuDTO menuDTO)
        {
            return new Menu
            { 
                Name = menuDTO.Name,
                Description = menuDTO.Description,
                ChefId = menuDTO.ChefId
            };

        }
    }
}

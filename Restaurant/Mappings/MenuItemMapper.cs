using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Mappings
{
    public static class MenuItemMapper
    {
        public static MenuItems MenuItemDTOToModel(MenuItemsDTO menuItemsDTO)
        {
            return new MenuItems
            {
                Name = menuItemsDTO.Name,
                Price = menuItemsDTO.Price,
                Ingredients = menuItemsDTO.Ingredients,
                MenuID = menuItemsDTO.MenuID,                
            };

        }
    }
}

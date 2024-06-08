using Database.Models;
using Restaurant.DTOs;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Services
{
    public interface IMenuItems
    {
        Task AddMenuItems(MenuItemsDTO menuItemsDTO, CancellationToken token);
        MenuItems UpdateMenuItem(int id, MenuItemsDTO menuItemsDTO);
        Task<IEnumerable<MenuItems>> GetMenuItemsByMenuID(int menuID, CancellationToken token); // New method
    }
}

using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface IMenuItems
    {
        Task AddMenuItems(MenuItemsDTO userDTO,CancellationToken cancellationToken);

        MenuItems UpdateMenuItem(int id,MenuItemsDTO userDTO);
    }
}

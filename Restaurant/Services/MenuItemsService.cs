using Database.Models;
using Database.Repository;
using Microsoft.Extensions.Logging;
using Restaurant.DTOs;
using Restaurant.Mappings;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Services
{
    public class MenuItemsService : IMenuItems
    {
        private readonly IRepository<MenuItems> _repository;
        private readonly ILogger<MenuItemsDTO> _logger;

        public MenuItemsService(IRepository<MenuItems> repository, ILogger<MenuItemsDTO> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task AddMenuItems(MenuItemsDTO menuItemsDTO, CancellationToken cancellationToken)
        {
            menuItemsDTO.Status = "active";
            MenuItems menuItem = MenuItemMapper.MenuItemDTOToModel(menuItemsDTO);
            _repository.Add(menuItem);
            await _repository.SaveAsync(cancellationToken);
        }

        public MenuItems UpdateMenuItem(int id, MenuItemsDTO menuItemDTO)
        {
            var menuItem = _repository.GetQuery().FirstOrDefault(n => n.Id == id);
            if (menuItem != null)
            {
                menuItem.Name = menuItemDTO.Name;
                menuItem.Ingredients = menuItemDTO.Ingredients;
                menuItem.Status = menuItemDTO.Status;
                menuItem.MenuID = menuItemDTO.MenuID;
                menuItem.Price = menuItemDTO.Price;

                _repository.Save();
            }
            return menuItem;
        }

        public async Task<IEnumerable<MenuItems>> GetMenuItemsByMenuID(int menuID, CancellationToken token)
        {
            return await _repository.GetMenuItemsByMenuID(menuID, token);
        }
    }
}

using Database.Context;
using Database.Models;
using Database.Repository;
using Restaurant.DTOs;
using Restaurant.Mappings;

namespace Restaurant.Services
{
    public class MenuItemsService : IMenuItems
    {
        private readonly IRepository<MenuItems> _repository;
        private readonly ILogger<MenuItemsDTO> _logger;
        private readonly ApplicationDbContext _context;

        public MenuItemsService(IRepository<MenuItems> repository,ILogger<MenuItemsDTO> logger,ApplicationDbContext applicationDbContext)
        {
            _repository = repository;
            _logger = logger;
            _context = applicationDbContext;
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
            var menuItem = _context.Set<MenuItems>().FirstOrDefault(n => n.Id == id);
            if(menuItem != null)
            {
                menuItem.Name = menuItemDTO.Name;
                menuItem.Ingredients = menuItemDTO.Ingredients;
                menuItem.Status = menuItemDTO.Status;
                menuItem.MenuID = menuItemDTO.MenuID;
                _repository.Save();
            }
            return menuItem;
        }
    }
}

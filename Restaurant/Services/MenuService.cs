using Database.Context;
using Database.Models;
using Database.Repository;
using Restaurant.DTOs;
using Restaurant.Mappings;
using System.Reflection.Metadata.Ecma335;

namespace Restaurant.Services
{
    public class MenuService : IMenuService
    {
        private readonly IRepository<Menu> _repository;
        private readonly ILogger<MenuDTO> _logger;
        private readonly ApplicationDbContext _context;

        public MenuService(IRepository<Menu> repository,ILogger<MenuDTO> logger,ApplicationDbContext applicationDbContext)
        {
            _repository = repository;
            _logger = logger;
            _context = applicationDbContext;
        }       

        public async Task RegisterMenu(MenuDTO menuDTO,CancellationToken cancellation)
        {
            menuDTO.Status = "active";
            Menu registeredMenu = MenuMapper.MenuDTOToModel(menuDTO);
            _repository.Add(registeredMenu);
            await _repository.SaveAsync(cancellation);
        }

        public async Task DeleteMenu(int Id, CancellationToken cancellationToken)
        {
        }

        public Menu UpdateMenu(int id,MenuDTO menuDTO)
        {
            var menu = _context.Set<Menu>().FirstOrDefault(n => n.Id == id);
            if (menu != null)
            {
                menu.Name = menuDTO.Name;
                menu.Description = menuDTO.Description;
                menu.ChefId = menuDTO.ChefId;
                menu.Status = menuDTO.Status;
                _repository.Save();
            }
            return menu;
        }
    }
}

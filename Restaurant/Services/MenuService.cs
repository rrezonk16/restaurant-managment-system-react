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

        public MenuService(IRepository<Menu> repository,ILogger<MenuDTO> logger)
        {
            _repository = repository;
            _logger = logger; 
        }       

        public async Task RegisterMenu(MenuDTO menuDTO,CancellationToken cancellation)
        {
            Menu registeredMenu = MenuMapper.MenuDTOToModel(menuDTO);
            _repository.Add(registeredMenu);
            await _repository.SaveAsync(cancellation);
        }

        public async Task DeleteMenu(int Id, CancellationToken cancellationToken)
        {
          //await _repository.Delete(Id,cancellationToken);
        }
    }
}

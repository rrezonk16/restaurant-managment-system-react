using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface IMenuService
    {
        Task RegisterMenu(MenuDTO menuDTO,CancellationToken cancellation);
        Task DeleteMenu(int Id, CancellationToken cancellationToken);
        Menu UpdateMenu(int id, MenuDTO menuDTO);
    }
}

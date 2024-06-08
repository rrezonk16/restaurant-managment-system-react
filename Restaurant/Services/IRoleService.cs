using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface IRoleService
    {
        Task AddRole(RoleDTO roleDTO,CancellationToken cancellationToken);
        Roles UpdateRole(int id,RoleDTO roleDTO);
    }
}

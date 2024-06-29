using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Mappings
{
    public static class RoleMapper
    {
        public static Roles RoleDTOToModel(RoleDTO roleDTO)
        {
            return new Roles
            {
                Name = roleDTO.Name,
                Status = roleDTO.Status,
                AllowedPages = roleDTO.AllowedPages // Directly map the string
            };
        }

        public static RoleDTO ModelToRoleDTO(Roles role)
        {
            return new RoleDTO
            {
                Name = role.Name,
                Status = role.Status,
                AllowedPages = role.AllowedPages // Directly map the string
            };
        }
    }
}

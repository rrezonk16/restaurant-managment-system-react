using Database.Models;
using Restaurant.DTOs;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using System.Text;

namespace Restaurant.Mappings
{
    public static class RoleMapper
    {
        public static Roles RoleDTOToModel(RoleDTO roleDTO)
        {
            return new Roles
            {
                Name = roleDTO.Name,
                Status = roleDTO.Status
            };
        }
    }
}


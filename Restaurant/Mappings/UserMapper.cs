using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Mappings
{
    public static class UserMapper
    {
        public static Users UserDTOToModel(UserDTO userDTO)
        {
            return new Users
            {
                Name = userDTO.Name,
                Surname = userDTO.Surname,
                Email = userDTO.Email,
                Birthday = userDTO.Birthday,
                PhoneNumber = userDTO.PhoneNumber,
                Password = userDTO.Password,
            };
        }
    }
}

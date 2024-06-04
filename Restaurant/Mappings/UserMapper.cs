using Database.Models;
using Restaurant.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace Restaurant.Mappings
{
    public static class UserMapper
    {
        public static Users UserDTOToModel(UserDTO userDTO)
        {
            string hashedPassword = HashPassword(userDTO.Password);
            return new Users
            {
                Name = userDTO.Name,
                Surname = userDTO.Surname,
                Email = userDTO.Email,
                Birthday = userDTO.Birthday,
                PhoneNumber = userDTO.PhoneNumber,
                Password = hashedPassword,
                RoleId = userDTO.RoleId,
                Status = userDTO.Status,
                ContractDueDate = userDTO.ContractDueDate,
            };
        }

        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        public static bool VerifyPassword(string enteredPassword, string storedHash)
        {
            string enteredHash = HashPassword(enteredPassword);
            return enteredHash == storedHash;
        }
    }

}


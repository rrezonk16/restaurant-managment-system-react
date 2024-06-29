using System;
using System.Threading;
using System.Threading.Tasks;
using Database.Context;
using Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Restaurant.DTOs;
using Restaurant.Mappings;

namespace Restaurant.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserService> _logger;

        public UserService(ApplicationDbContext context, ILogger<UserService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void Delete(int id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Users> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Users?> LogIn(string email, string password, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
            if (user == null || !UserMapper.VerifyPassword(password, user.Password))
            {
                return null;
            }
            return user;
        }

        public async Task RegisterUser(UserDTO userDTO, CancellationToken cancellationToken)
        {
            Users registeredUser = UserMapper.UserDTOToModel(userDTO);
            registeredUser.RoleId = 5;
            registeredUser.Status = "active";
            _context.Users.Add(registeredUser);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<Users> UpdateUser(int id, UserDTO userDTO, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            user.Surname = userDTO.Surname;
            user.Name = userDTO.Name;
            user.Email = userDTO.Email;
            user.RoleId = userDTO.RoleId;
            user.Birthday = userDTO.Birthday;
            user.PhoneNumber = userDTO.PhoneNumber;
            user.ContractDueDate = userDTO.ContractDueDate;
            user.Status = userDTO.Status;

            await _context.SaveChangesAsync(cancellationToken);
            return user;
        }

       
    }
}

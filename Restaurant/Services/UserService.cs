using Database.Context;
using Database.Models;
using Database.Repository;
using Microsoft.EntityFrameworkCore;
using Restaurant.DTOs;
using Restaurant.Mappings;

namespace Restaurant.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<Users> _repository;
        private readonly ILogger<UserService> _logger;
        private readonly ApplicationDbContext _context;

        public UserService(IRepository<Users> repository, ILogger<UserService> logger,ApplicationDbContext context)
        {
            _repository = repository;
            _logger = logger;
            _context = context;
        }

        public async Task LogIn(string email,CancellationToken cancellationToken)
        {
            var user = await GetUserByEmailAsync(email);
            if(user == null)
            {
                return;
            }
        }

        private async Task<Users> GetUserByEmailAsync(string email)
        {
            return await _repository.GetAll().FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task RegisterUser(UserDTO userDTO, CancellationToken cancellationToken)
        {
             Users registeredUser = UserMapper.UserDTOToModel(userDTO);
            registeredUser.RoleId = 1;
            registeredUser.Status = "active";
            _repository.Add(registeredUser);
            await _repository.SaveAsync(cancellationToken);
        }

        public void Delete(int Id, CancellationToken cancellation)
        {
            _repository.Delete(Id, cancellation);
        }

        public  Users UpdateUser(int id,UserDTO userDTO)
        {
            var user = _context.Set<Users>().FirstOrDefault(n => n.Id == id);
            if(user != null) 
            {
                user.Surname = userDTO.Surname;
                user.Name = userDTO.Name;
                user.Email = userDTO.Email;
                user.Password = userDTO.Password;
                user.RoleId = userDTO.RoleId;
                _repository.Save();
            }
            return user;
        }
    }
}

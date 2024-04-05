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
        public UserService(IRepository<Users> repository, ILogger<UserService> logger)
        {
            _repository = repository;
            _logger = logger;
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
            _repository.Add(registeredUser);
            await _repository.SaveAsync(cancellationToken);
        }
    }
}

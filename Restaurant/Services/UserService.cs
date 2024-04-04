using Database.Models;
using Database.Repository;
using Org.BouncyCastle.Tls;
using Restaurant.DTOs;
using Restaurant.Mappings;
using System.Threading;

namespace Restaurant.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<Users> _repository;

        public UserService(IRepository<Users> repository)
        {
            _repository = repository;
        }

        public async Task RegisterUser(UserDTO userDTO, CancellationToken cancellationToken)
        {
             Users registeredUser = UserMapper.UserDTOToModel(userDTO);
            _repository.Add(registeredUser);
            await _repository.SaveAsync(cancellationToken);
        }
    }
}

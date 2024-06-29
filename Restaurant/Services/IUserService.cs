using Database.Models;
using Restaurant.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Services
{
    public interface IUserService
    {
        Task RegisterUser(UserDTO userDTO, CancellationToken cancellationToken);
        Task<Users> GetUserByEmailAsync(string email);
        Task<Users?> LogIn(string email, string password, CancellationToken cancellationToken);
        void Delete(int id, CancellationToken cancellationToken);
        Task<Users> UpdateUser(int id, UserDTO userDTO, CancellationToken cancellationToken);
    }
}

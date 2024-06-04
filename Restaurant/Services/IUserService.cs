using Database.Models;
using Restaurant.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Services
{
    public interface IUserService
    {
        Task RegisterUser(UserDTO userDTO, CancellationToken cancellationToken);
        Task<Users> GetUserByEmailAsync(string email); // Update this method signature
        Task<Users?> LogIn(string email, string password, CancellationToken cancellationToken); // Update this method signature
        void Delete(int Id, CancellationToken cancellation);
        Users UpdateUser(int id, UserDTO userDTO);
    }
}

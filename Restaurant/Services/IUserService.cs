using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface IUserService
    {
        Task RegisterUser(UserDTO userDTO,CancellationToken cancellationToken);
        Task LogIn(String email,CancellationToken cancellationToken);
        void Delete(int Id, CancellationToken cancellation);

        Users UpdateUser(int id,UserDTO userDTO);
    }
}

using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface IRestaurantService
    {
        Task AddRestaurant(RestaurantDTO restaurantDTO,CancellationToken cancellationToken);
    }
}

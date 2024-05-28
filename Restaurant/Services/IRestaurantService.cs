using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface IRestaurantService
    {
        Task AddRestaurant(Restaurants restaurant,CancellationToken cancellationToken);

        Task<Restaurants> UpdateRestaurant(int id,RestaurantDTO restaurantDTO, CancellationToken cancellationToken);
    }
}

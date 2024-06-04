using Restaurant.DTOs;
using Database.Models;

namespace Restaurant.Mappings
{
    public static class RestaurantMapper
    {
        public static Restaurants RestaurantDTOToModel(RestaurantDTO restaurant)
        {
            return new Restaurants
            {

                Name = restaurant.Name,
                Address = restaurant.Address,
                OpenHours = restaurant.OpenHours,
                ManagerId = restaurant.ManagerId
                //Manager = UserMapper.UserDTOToModel(restaurant.Manager)
                //Reservations = restaurant.Reservations?.Select(ReservationMapper.ReservationDTOToModel).ToList()
            };
        }
        
    }
}

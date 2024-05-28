using Restaurant.DTOs;
using Database.Models;

namespace Restaurant.Mappings
{
    public static class RestaurantMapper
    {
        public static Restaurants RestaurantDTOToModel(Restaurants restaurant)
        {
            return new Restaurants
            {
                Id = restaurant.Id,
                Name = restaurant.Name,
                Address = restaurant.Address,
                OpenHours = restaurant.OpenHours,
                ManagerId = restaurant.ManagerId,
                Reservations = restaurant.Reservations?.Select(r => new Reservation
                {
                    ID = r.ID,
                    UserID = r.UserID,
                    RestaurantId = r.RestaurantId
                }).ToList()
            };
        }
    }
}

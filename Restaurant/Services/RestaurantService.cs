using Database.Context;
using Database.Models;
using Database.Repository;
using Restaurant.DTOs;
using Restaurant.Mappings;

namespace Restaurant.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly IRepository<Restaurants> _repository;
        private readonly ILogger<RestaurantDTO> _logger;
        private readonly ApplicationDbContext _context;

        public RestaurantService(IRepository<Restaurants> repository,ILogger<RestaurantDTO> logger,ApplicationDbContext applicationDbContext)
        {
            _repository = repository;
            _logger = logger;
            _context = applicationDbContext;
        }

        public async Task AddRestaurant(Restaurants restaurant, CancellationToken cancellation)
        {
            //Add a restaurant and set its status to active
            restaurant.Status = "active";
            Restaurants restaurantToAdd = RestaurantMapper.RestaurantDTOToModel(restaurant);
            _repository.Add(restaurantToAdd);
            await _repository.SaveAsync(cancellation);
        }

        public async Task<Restaurants> UpdateRestaurant(int id, RestaurantDTO restaurantDTO, CancellationToken cancellationToken)
        {
            
            var existingRestaurant = await _repository.Get(id, cancellationToken);
            //Check if the restaurant exists in database
            if (existingRestaurant == null)
            {
                _logger.LogError($"Restaurant with ID {id} not found.");
                return null;
            }

            //Update the properties of the existing restaurant
            existingRestaurant.Name = restaurantDTO.Name;
            existingRestaurant.Address = restaurantDTO.Address;
            existingRestaurant.OpenHours = restaurantDTO.OpenHours;
            existingRestaurant.ManagerId = restaurantDTO.ManagerId;
            existingRestaurant.Status = restaurantDTO.Status;

            //Update Reservations
            var existingReservations = existingRestaurant.Reservations ?? new List<Reservation>();
            var newReservationIds = restaurantDTO.Reservations ?? new List<int>();

            //Remove reservations that are not in the new list
            var reservationsToRemove = existingReservations.Where(r => !newReservationIds.Contains(r.ID)).ToList();
            foreach (var reservation in reservationsToRemove)
            {
                existingReservations.Remove(reservation);
            }

            //Add new reservations that are not in the existing list
            var reservationsToAdd = newReservationIds.Where(id => !existingReservations.Any(r => r.ID == id)).Select(id => new Reservation { ID = id }).ToList();
            foreach (var reservation in reservationsToAdd)
            {
                existingReservations.Add(reservation);
            }

            _repository.Update(existingRestaurant);
            await _repository.SaveAsync(cancellationToken);

            return existingRestaurant;
        }
    }
}

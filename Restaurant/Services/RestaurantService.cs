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

        public async Task AddRestaurant(RestaurantDTO restaurantDTO, CancellationToken cancellation)
        {
            //Add a restaurant and set its status to active

            Restaurants restaurantToAdd = RestaurantMapper.RestaurantDTOToModel(restaurantDTO);
            _repository.Add(restaurantToAdd);
            await _repository.SaveAsync(cancellation);
        }

    }
}

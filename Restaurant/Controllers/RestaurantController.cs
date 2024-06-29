using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Restaurant.DTOs;
using Restaurant.Services;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRepository<Restaurants> _repository;
        private readonly IRestaurantService _restaurantService;

        public RestaurantController(IRepository<Restaurants> repository, IRestaurantService restaurantService)
        {
            _repository = repository;
            _restaurantService = restaurantService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Restaurants> GetRestaurant(int id, CancellationToken token)
        {
            return await _repository.Get(id, token);
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IEnumerable<Restaurants>> GetAllRestaurants(CancellationToken token)
        {
            return await _repository.GetAllAsync(token);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddRestaurant(RestaurantDTO restaurant, CancellationToken cancellationToken)
        {
            await _restaurantService.AddRestaurant(restaurant, cancellationToken);
            return Ok();
        }
    }
}

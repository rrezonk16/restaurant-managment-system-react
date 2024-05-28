using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Restaurant.DTOs;
using Restaurant.Services;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRepository<Restaurants> _repository;
        private readonly IRestaurantService _restaurantService;

        public RestaurantController(IRepository<Restaurants> repository,IRestaurantService restaurantService)
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

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddRestaurant(Restaurants restaurant, CancellationToken cancellationToken)
        {
            await _restaurantService.AddRestaurant(restaurant, cancellationToken);
            return Ok();
        }
    }
}

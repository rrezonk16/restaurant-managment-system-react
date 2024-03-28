using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IRepository<Menu> _repository;

        public MenuController(IRepository<Menu> repository)
        {
            _repository = repository;
        }


        [HttpGet]
        [Route("[action]/{id}")]

        public async Task<Menu> GetMenu(int id, CancellationToken token)
        {
            return await _repository.Get(id, token);

        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Menu> GetMenus()
        {
            return _repository.GetAll();
        }

    }

}
 
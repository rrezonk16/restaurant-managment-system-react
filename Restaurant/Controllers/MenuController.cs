using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Restaurant.DTOs;
using Restaurant.Services;
using System.Data.Entity;
using ZstdSharp.Unsafe;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IRepository<Menu> _repository;
        private readonly IMenuService _menuService;
        public MenuController(IRepository<Menu> repository,IMenuService menuService)
        {
            _repository = repository;
            _menuService = menuService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Menu> GetMenu(int id, CancellationToken token)
        {
            return await _repository.Get(id, token);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddMenu(MenuDTO menuDTO,CancellationToken cancellationToken)
        {
            await _menuService.RegisterMenu(menuDTO,cancellationToken);
            return Ok();
        }

        /*[HttpDelete]
        [Route("[action]")]
        public async Task<IActionResult> DeleteMenu(int id,CancellationToken cancellationToken)
        {
            await _menuService.DeleteMenu(id, cancellationToken);
            return Ok();
        }*/

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Menu> GetMenus()
        {
            return _repository.GetAll();
        }
    }
}
 
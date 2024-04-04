using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Database.Models;
using Database.Repository;
using Org.BouncyCastle.Utilities;
using System.CodeDom;
using Restaurant.Services;
using Restaurant.DTOs;


namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<Users> _repository;
        private readonly IUserService _userService;

        public UserController(IRepository<Users> repository,IUserService userService)
        {
            _repository = repository;
            _userService = userService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Users> GetUser(int id,CancellationToken cancellationToken)
        {
            return await _repository.Get(id, cancellationToken);
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Users> GetAllUsers()
        {
            return _repository.GetAll(); 
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(UserDTO userDTO,CancellationToken cancellationToken)
        {
            await _userService.RegisterUser(userDTO, cancellationToken);
            return Ok();
        }
    }
}

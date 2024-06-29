using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Restaurant.DTOs;
using Restaurant.Services;
using ZstdSharp.Unsafe;
using Microsoft.Data.SqlClient;

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

        [HttpDelete("delete-menu-by-id/{id}")]
        public void DeleteMenu(int id)
        {
            string connectionString = "Server=.;Database=restaurant_roles;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM Menu WHERE id = @id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    int rowsAffected = sqlCommand.ExecuteNonQuery();
                    sqlConnection.Close();
                }
            }
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Menu> GetMenus()
        {
            return _repository.GetAll();
        }

        [HttpPut("update-menu-by-id/{id}")]
        public IActionResult UpdateMenu(int id, [FromBody] MenuDTO menuDTO)
        {
            var menu = _menuService.UpdateMenu(id, menuDTO);
            return Ok(menu);
        }
    }
}
 
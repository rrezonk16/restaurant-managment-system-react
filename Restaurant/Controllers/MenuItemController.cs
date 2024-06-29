using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Restaurant.DTOs;
using Restaurant.Services;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IRepository<MenuItems> _repository;
        private readonly IMenuItems _menuItemService;

        public MenuItemController(IRepository<MenuItems> repository, IMenuItems menuItemService)
        {
            _repository = repository;
            _menuItemService = menuItemService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<MenuItems> GetMenuItemById(int id, CancellationToken token)
        {
            return await _repository.Get(id, token);
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<MenuItems> GetAllMenuItems()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddMenuItem(MenuItemsDTO menuItemsDTO, CancellationToken cancellationToken)
        {
            await _menuItemService.AddMenuItems(menuItemsDTO, cancellationToken);
            return Ok();
        }

        [HttpDelete]
        public void DeleteMenuItemByID(int id)
        {
            string connectionString = "Server=.;Database=restaurant;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM MenuItems WHERE Id = @id";

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

        [HttpDelete]
        [Route("[action]")]
        void DeleteMenuItem(int id)
        {
            string connectionString = "Server=.;Database=restaurant_roles;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM MenuItems WHERE Id = @id";

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

        [HttpPut]
        public IActionResult UpdateMenu(int id, [FromBody] MenuItemsDTO menuItemDTO)
        {
            var menu = _menuItemService.UpdateMenuItem(id, menuItemDTO);
            return Ok(menu);
        }

        [HttpGet]
        [Route("[action]/{menuID}")]
        public async Task<IActionResult> GetMenuItemsByMenuID(int menuID, CancellationToken token)
        {
            var menuItems = await _menuItemService.GetMenuItemsByMenuID(menuID, token);
            return Ok(menuItems);
        }
    }
}

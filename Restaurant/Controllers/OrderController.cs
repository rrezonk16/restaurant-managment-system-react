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
    public class OrderController : ControllerBase
    {
        private readonly IRepository<Orders> _repository;
        private readonly IOrderService _orderService;
        public OrderController(IRepository<Orders> repository,IOrderService  orderService)
        {
            _repository = repository;
            _orderService = orderService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Orders> GetOrderByID(int id, CancellationToken token)
        {
            return await _repository.Get(id, token);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> RegisterOrder(OrderDTO orderDTO,CancellationToken cancellationToken)
        {
            await _orderService.RegisterOrder(orderDTO,cancellationToken);
            return Ok();
        }

        [HttpDelete("delete-order-by-id/{id}")]
        public void DeleteOrder(int id)
        {
            string connectionString = "Server=.;Database=restaurant;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM Orders WHERE Id = @id";

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
        public IEnumerable<Orders> GetOrders()
        {
            return _repository.GetAll();
        }
        
        [HttpPut("update-order-by-id/{id}")]
        public IActionResult UpadateOrder(int id, [FromBody] OrderDTO orderDTO)
        {
            var order = _orderService.UpdateOrders(id, orderDTO);
            return Ok(order);
        }
    }
}
 
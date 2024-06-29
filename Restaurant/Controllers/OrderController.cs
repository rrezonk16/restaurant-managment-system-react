using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Restaurant.DTOs;
using Restaurant.Services;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IRepository<Orders> _repository;
        private readonly IOrderService _orderService;

        public OrderController(IRepository<Orders> repository, IOrderService orderService)
        {
            _repository = repository;
            _orderService = orderService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<Orders>> GetOrderByID(int id, CancellationToken token)
        {
            var order = await _repository.Get(id, token);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> RegisterOrder(OrderDTO orderDTO, CancellationToken cancellationToken)
        {
            int orderId = await _orderService.RegisterOrder(orderDTO, cancellationToken);
            return Ok(new { OrderId = orderId });
        }

        [HttpDelete("delete-order-by-id/{id}")]
        public async Task<IActionResult> DeleteOrder(int id, CancellationToken cancellationToken)
        {
            var order = await _repository.Get(id, cancellationToken);
            if (order == null)
            {
                return NotFound();
            }

            _repository.Delete(id, cancellationToken);
            await _repository.SaveAsync(cancellationToken);
            return NoContent();
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders(CancellationToken cancellationToken)
        {
            var orders = await _repository.GetAllAsync(cancellationToken);
            return Ok(orders);
        }

        [HttpPut("update-order-by-id/{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderDTO orderDTO, CancellationToken cancellationToken)
        {
            try
            {
                var updatedOrder = await _orderService.UpdateOrders(id, orderDTO, cancellationToken);
                if (updatedOrder == null)
                {
                    return NotFound();
                }
                return Ok(updatedOrder);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}

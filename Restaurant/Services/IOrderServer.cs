using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface IOrderService
    {
        Task RegisterOrder(OrderDTO orderDTO, CancellationToken cancellation);
        Orders UpdateOrders(int Id, OrderDTO orderDTO);
    }
}

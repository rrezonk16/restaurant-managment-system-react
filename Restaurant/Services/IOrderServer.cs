using Database.Models;
using Restaurant.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Services
{
    public interface IOrderService
    {
        Task<int> RegisterOrder(OrderDTO orderDTO, CancellationToken cancellation);
        Task<Orders?> UpdateOrders(int id, OrderDTO orderDTO, CancellationToken cancellationToken);
    }
}

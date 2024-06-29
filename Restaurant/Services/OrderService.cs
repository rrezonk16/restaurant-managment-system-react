using Database.Context;
using Database.Models;
using Database.Repository;
using Restaurant.DTOs;
using Restaurant.Mappings;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Orders> _repository;
        private readonly ILogger<OrderDTO> _logger;
        private readonly ApplicationDbContext _context;

        public OrderService(IRepository<Orders> repository, ILogger<OrderDTO> logger, ApplicationDbContext applicationDbContext)
        {
            _repository = repository;
            _logger = logger;
            _context = applicationDbContext;
        }

        public async Task<int> RegisterOrder(OrderDTO orderDTO, CancellationToken cancellation)
        {
            orderDTO.Status = "active";
            Orders registeredOrder = OrderMapper.OrderDTOToModel(orderDTO);
            _repository.Add(registeredOrder);
            await _repository.SaveAsync(cancellation);
            return registeredOrder.Id;
        }

        public async Task<Orders?> UpdateOrders(int id, OrderDTO orderDTO, CancellationToken cancellationToken)
        {
            var order = await _repository.Get(id, cancellationToken);
            if (order == null)
            {
                return null;
            }

            order.Status = orderDTO.Status;
            order.TableId = orderDTO.TableId;
            order.MenuItemIds = orderDTO.MenuItemIds;
            order.userID = orderDTO.userID;

            _repository.Update(order);
            await _repository.SaveAsync(cancellationToken);
            return order;
        }
    }
}

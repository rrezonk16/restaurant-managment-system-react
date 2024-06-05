using Database.Context;
using Database.Models;
using Database.Repository;
using Restaurant.DTOs;
using Restaurant.Mappings;

namespace Restaurant.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Orders> _repository;
        private readonly ILogger<OrderDTO> _logger;
        private readonly ApplicationDbContext _context;

        public OrderService(IRepository<Orders> repository,ILogger<OrderDTO> logger,ApplicationDbContext applicationDbContext)
        {
            _repository = repository;
            _logger = logger;
            _context = applicationDbContext;
        }

        public async Task RegisterOrder(OrderDTO orderDTO, CancellationToken cancellation)
        {
            orderDTO.Status = "active";
            Orders registeredOrder = OrderMapper.OrderDTOToModel(orderDTO);
            _repository.Add(registeredOrder);
            await _repository.SaveAsync(cancellation);
        }

        public Orders UpdateOrders(int Id, OrderDTO orderDTO)
        {
            var order = _context.Set<Orders>().FirstOrDefault(n => n.Id == Id);
            if(order != null)
            {
                order.Status = orderDTO.Status;
                order.TableId = orderDTO.TableId;
                order.MenuItemIds = orderDTO.MenuItemIds;
                order.userID = orderDTO.userID;
                _repository.Save();
            }
            return order;
        }
    }
}

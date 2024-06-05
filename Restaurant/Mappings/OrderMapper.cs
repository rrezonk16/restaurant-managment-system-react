using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Mappings
{
    public static class OrderMapper
    {
        public static Orders OrderDTOToModel(OrderDTO orderDTO)
        {
            return new Orders
            { 
                Status = orderDTO.Status,
                MenuItemIds = orderDTO.MenuItemIds,
                TableId = orderDTO.TableId,
                userID = orderDTO.userID
            };

        }
    }
}

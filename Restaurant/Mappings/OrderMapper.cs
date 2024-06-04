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
                Price = orderDTO.Price,
                Status = orderDTO.Status,
                //ItemsIDs = orderDTO.ItemsIDs,
               // TableId = orderDTO.TableId
            };

        }
    }
}

using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Mappings
{
    public static class TableMapper
    {
        public static Table TableDTOToModel(TableDTO tableDTO)
        {
            return new Table
            {
                RestaurantID = tableDTO.RestaurantID,
                Status = tableDTO.Status,
                NumberOfSeats = tableDTO.NumberOfSeats
            };

        }
    }
}


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
                Id = tableDTO.TableID, // Ensure TableID is mapped to Id
                RestaurantID = tableDTO.RestaurantID,
                Status = tableDTO.Status,
                NumberOfSeats = tableDTO.NumberOfSeats
            };
        }

        public static TableDTO ModelToTableDTO(Table table)
        {
            return new TableDTO
            {
                TableID = table.Id, // Ensure Id is mapped to TableID
                RestaurantID = table.RestaurantID,
                Status = table.Status,
                NumberOfSeats = table.NumberOfSeats
            };
        }
    }
}

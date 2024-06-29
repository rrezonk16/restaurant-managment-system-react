using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface ITableService
    {
        Task AddTable(TableDTO tableDTO,CancellationToken cancellationToken);

        Table UpdateTable(int id,TableDTO tableDTO);

        Task<IEnumerable<TableDTO>> GetTablesByRestaurantId(int restaurantId, CancellationToken token);

    }
}

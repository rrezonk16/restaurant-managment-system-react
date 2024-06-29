using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database.Models;

namespace Restaurant.Services
{
    public interface IWorkplaceService
    {
        Task<Workplace> GetByIdAsync(int id, CancellationToken token);
        Task<Workplace> AddAsync(Workplace workplace, CancellationToken token);
        Task<Workplace> UpdateAsync(Workplace workplace, CancellationToken token);
        Task DeleteAsync(int id, CancellationToken token);
        Task<IEnumerable<Workplace>> GetAllAsync(CancellationToken token);
        Task<Workplace> GetByUserIdAsync(int userId, CancellationToken token);
    }
}

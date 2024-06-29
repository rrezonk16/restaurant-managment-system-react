using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database.Context;
using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Restaurant.Services
{
    public class WorkplaceService : IWorkplaceService
    {
        private readonly ApplicationDbContext _context;

        public WorkplaceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Workplace> GetByIdAsync(int id, CancellationToken token)
        {
            return await _context.Workplace.FirstOrDefaultAsync(w => w.Id == id, token);
        }

        public async Task<Workplace> AddAsync(Workplace workplace, CancellationToken token)
        {
            _context.Workplace.Add(workplace);
            await _context.SaveChangesAsync(token);
            return workplace;
        }

        public async Task<Workplace> UpdateAsync(Workplace workplace, CancellationToken token)
        {
            _context.Workplace.Update(workplace);
            await _context.SaveChangesAsync(token);
            return workplace;
        }

        public async Task DeleteAsync(int id, CancellationToken token)
        {
            var workplace = await _context.Workplace.FindAsync(id);
            if (workplace != null)
            {
                _context.Workplace.Remove(workplace);
                await _context.SaveChangesAsync(token);
            }
        }

        public async Task<IEnumerable<Workplace>> GetAllAsync(CancellationToken token)
        {
            return await _context.Workplace.ToListAsync(token);
        }

        public async Task<Workplace> GetByUserIdAsync(int userId, CancellationToken token)
        {
            return await _context.Workplace.FirstOrDefaultAsync(w => w.UserId == userId, token);
        }
    }
}

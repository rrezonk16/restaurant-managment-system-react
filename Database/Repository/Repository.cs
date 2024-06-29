using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Database.Context;
using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Database.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {
        private readonly ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(T entity)
        {
            _context.Add(entity);
        }

        public IQueryable<T> GetQuery()
        {
            return _context.Set<T>();
        }

        public void Delete(int id, CancellationToken token)
        {
            var entity = _context.Set<T>().FirstOrDefault(f => f.Id == id);
            if (entity != null)
            {
                _context.Remove(entity);
            }
        }

        public async Task<T?> Get(int id, CancellationToken token)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(f => f.Id == id, token);
        }

        public IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsQueryable();
        }

        public async Task<IEnumerable<T>> GetAllAsync(CancellationToken token)
        {
            return await _context.Set<T>().ToListAsync(token);
        }

        public async Task SaveAsync(CancellationToken token)
        {
            await _context.SaveChangesAsync(token);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public async Task<IEnumerable<MenuItems>> GetMenuItemsByMenuID(int menuID, CancellationToken token)
        {
            return await _context.Set<MenuItems>()
                .Where(mi => mi.MenuID == menuID)
                .ToListAsync(token);
        }

        public async Task<IEnumerable<Table>> GetTablesByRestaurantId(int restaurantId, CancellationToken token)
        {
            return await _context.Set<Table>()
                .Where(t => t.RestaurantID == restaurantId)
                .ToListAsync(token);
        }
    }
}

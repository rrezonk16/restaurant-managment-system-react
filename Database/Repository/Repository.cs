using Database.Context;
using Database.Models;
using Database.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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

        public async Task Delete(int id, CancellationToken token)
        {
            var entity = await Get(id, token);
            if (entity != null)
            {
                _context.Set<T>().Remove(entity);
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

        public async Task SaveAsync(CancellationToken token)
        {
            await _context.SaveChangesAsync(token);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public async Task<Users> CheckIfExistsInDataBase(string name, CancellationToken cancellationToken)
        {
            return await _context.Set<Users>().FirstOrDefaultAsync(u => u.Name == name, cancellationToken);
        }
    }
}

using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database.Models;

namespace Database.Repository
{
    public interface IRepository<T> where T : BaseModel
    {
        Task<T?> Get(int id, CancellationToken token);
        IQueryable<T> GetAll();
        IQueryable<T> GetQuery(); // Method to return a queryable collection
        void Add(T entity);
        void Update(T entity);
        void Delete(int id, CancellationToken token);
        Task SaveAsync(CancellationToken token);
        void Save();
        Task<IEnumerable<MenuItems>> GetMenuItemsByMenuID(int menuID, CancellationToken token); // New method
    }
}

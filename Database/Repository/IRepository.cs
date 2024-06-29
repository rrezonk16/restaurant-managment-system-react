using Database.Models;

namespace Database.Repository
{
    public interface IRepository<T> where T : BaseModel
    {
        Task<T?> Get(int id, CancellationToken token);
        IQueryable<T> GetAll();
        Task<IEnumerable<T>> GetAllAsync(CancellationToken token);
        IQueryable<T> GetQuery();
        void Add(T entity);
        void Update(T entity); // Update to match your current repository implementation
        void Delete(int id, CancellationToken token);
        Task SaveAsync(CancellationToken token);
        void Save();
        Task<IEnumerable<MenuItems>> GetMenuItemsByMenuID(int menuID, CancellationToken token);
        Task<IEnumerable<Table>> GetTablesByRestaurantId(int restaurantId, CancellationToken token);
    }
}

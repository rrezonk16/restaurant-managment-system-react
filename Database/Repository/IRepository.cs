using Database.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Database.Repository
{
    public interface IRepository<T> where T : BaseModel
    {
        Task<T?> Get(int id, CancellationToken token);
        IQueryable<T> GetAll();
        IQueryable<T> GetQuery(); // Define GetQuery method

        void Add(T entity);
        void Update(T entity);
        Task Delete(int id, CancellationToken token);
        Task SaveAsync(CancellationToken token);
        Task<Users> CheckIfExistsInDataBase(string name, CancellationToken cancellationToken);

    }
}

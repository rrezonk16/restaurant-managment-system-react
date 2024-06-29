using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Database.Context;
using Database.Models;
using Database.Repository;
using Microsoft.EntityFrameworkCore;
using Restaurant.DTOs;
using Restaurant.Mappings;

namespace Restaurant.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRepository<Roles> _repository;
        private readonly ILogger<RoleDTO> _logger;
        private readonly ApplicationDbContext _context;

        public RoleService(IRepository<Roles> repository, ILogger<RoleDTO> logger, ApplicationDbContext context)
        {
            _repository = repository;
            _logger = logger;
            _context = context;
        }

        public async Task AddRole(RoleDTO roleDTO, CancellationToken cancellationToken)
        {
            roleDTO.Status = "active";
            Roles role = RoleMapper.RoleDTOToModel(roleDTO);
            _repository.Add(role);
            await _repository.SaveAsync(cancellationToken);
        }

        public Roles UpdateRole(int id, RoleDTO roleDTO)
        {
            var role = _context.Set<Roles>().FirstOrDefault(n => n.Id == id);
            if (role != null)
            {
                role.Name = roleDTO.Name;
                role.Status = roleDTO.Status;
                role.AllowedPages = roleDTO.AllowedPages;
                _repository.Save();
            }

            return role;
        }
    }
}

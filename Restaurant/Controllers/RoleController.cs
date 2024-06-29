using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Restaurant.DTOs;
using Restaurant.Services;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRepository<Roles> _repository;
        private readonly IRoleService _roleService;

        public RoleController(IRepository<Roles> repository, IRoleService roleService)
        {
            _repository = repository;
            _roleService = roleService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Roles> GetRoleById(int id, CancellationToken token)
        {
            return await _repository.Get(id, token);
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Roles> GetAllRoles()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddRole(RoleDTO roleDTO, CancellationToken cancellationToken)
        {
            await _roleService.AddRole(roleDTO, cancellationToken);
            return Ok();
        }

        [HttpDelete("delete-role-by-id/{id}")]
        public async Task<IActionResult> DeleteRole(int id, CancellationToken token)
        {
            var role = await _repository.Get(id, token);
            if (role != null)
            {
                _repository.Delete(id, token);
                await _repository.SaveAsync(token);
                return Ok();
            }
            return NotFound();
        }

        [HttpPut("update-role-by-id/{id}")]
        public IActionResult UpdateRoleById(int id, [FromBody] RoleDTO roleDTO)
        {
            var role = _roleService.UpdateRole(id, roleDTO);
            return Ok(role);
        }
    }
}

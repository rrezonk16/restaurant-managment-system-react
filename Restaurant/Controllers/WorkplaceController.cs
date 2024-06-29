using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Database.Models;
using Restaurant.DTOs;
using Restaurant.Mappings;
using Restaurant.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkplaceController : ControllerBase
    {
        private readonly IWorkplaceService _workplaceService;

        public WorkplaceController(IWorkplaceService workplaceService)
        {
            _workplaceService = workplaceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkplaceDTO>>> GetAll(CancellationToken token)
        {
            var workplaces = await _workplaceService.GetAllAsync(token);
            var workplaceDTOs = workplaces.Select(w => WorkplaceMapper.WorkplaceModelToDTO(w));
            return Ok(workplaceDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkplaceDTO>> GetById(int id, CancellationToken token)
        {
            var workplace = await _workplaceService.GetByIdAsync(id, token);
            if (workplace == null)
            {
                return NotFound();
            }
            var workplaceDTO = WorkplaceMapper.WorkplaceModelToDTO(workplace);
            return Ok(workplaceDTO);
        }

        [HttpPost]
        public async Task<ActionResult<WorkplaceDTO>> Create(WorkplaceDTO workplaceDTO, CancellationToken token)
        {
            var workplaceModel = WorkplaceMapper.WorkplaceDTOToModel(workplaceDTO);
            var createdWorkplace = await _workplaceService.AddAsync(workplaceModel, token);
            var createdWorkplaceDTO = WorkplaceMapper.WorkplaceModelToDTO(createdWorkplace);
            return CreatedAtAction(nameof(GetById), new { id = createdWorkplaceDTO.Id }, createdWorkplaceDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, WorkplaceDTO workplaceDTO, CancellationToken token)
        {
            if (id != workplaceDTO.Id)
            {
                return BadRequest();
            }

            var workplaceModel = WorkplaceMapper.WorkplaceDTOToModel(workplaceDTO);
            await _workplaceService.UpdateAsync(workplaceModel, token);
            return Ok(workplaceDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken token)
        {
            await _workplaceService.DeleteAsync(id, token);
            return NoContent();
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<WorkplaceDTO>> GetByUserId(int userId, CancellationToken token)
        {
            var workplace = await _workplaceService.GetByUserIdAsync(userId, token);
            if (workplace == null)
            {
                return NotFound();
            }
            var workplaceDTO = WorkplaceMapper.WorkplaceModelToDTO(workplace);
            return Ok(workplaceDTO);
        }
    }
}

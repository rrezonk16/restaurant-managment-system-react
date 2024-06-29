using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Mappings
{
    public static class WorkplaceMapper
    {
        public static Workplace WorkplaceDTOToModel(WorkplaceDTO workplaceDTO)
        {
            return new Workplace
            {
                Id = workplaceDTO.Id,
                Status = workplaceDTO.Status,
                UserId = workplaceDTO.UserId,
                RestaurantId = workplaceDTO.RestaurantId,
                Workdays = workplaceDTO.Workdays
            };
        }

        public static WorkplaceDTO WorkplaceModelToDTO(Workplace workplace)
        {
            return new WorkplaceDTO
            {
                Id = workplace.Id,
                Status = workplace.Status,
                UserId = workplace.UserId,
                RestaurantId = workplace.RestaurantId,
                Workdays = workplace.Workdays
            };
        }
    }
}

using System;

namespace Restaurant.DTOs
{
    public class WorkplaceDTO
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
        public int RestaurantId { get; set; }
        public string Workdays { get; set; }
    }
}

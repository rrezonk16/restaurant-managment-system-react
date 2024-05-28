using System.ComponentModel.DataAnnotations;

namespace Restaurant.DTOs
{
    public class RestaurantDTO
    {
        public int Id { get; set; }  // Assuming BaseModel has an Id property

        public string Name { get; set; }

        public string Address { get; set; }

        public string OpenHours { get; set; }

        public int? ManagerId { get; set; }

        // You can include a list of Reservation IDs or simplified Reservation DTOs
        public List<int> Reservations{ get; set; }

        public String Status { get; set; }
    }
}

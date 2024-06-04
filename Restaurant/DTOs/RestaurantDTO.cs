using System.ComponentModel.DataAnnotations;

namespace Restaurant.DTOs
{
    public class RestaurantDTO
    {        
        public string Name { get; set; }

        public string Address { get; set; }

        public string OpenHours { get; set; }

        public int? ManagerId { get; set; }
        //
        //public UserDTO? Manager { get; set; }

        //public ICollection<ReservationDTO> Reservations { get; set; }
    }
}

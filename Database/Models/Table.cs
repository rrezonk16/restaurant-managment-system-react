using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class Table : BaseModel
    {
        [Required]
        public int RestaurantID { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public int NumberOfSeats { get; set; }

        public Orders Order { get; set; }
        public int OrderId { get; set; }

    }

}

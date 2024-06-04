using System.ComponentModel.DataAnnotations;

namespace Database.Models
{
    public class Workplace: BaseModel
    {
        public int UserId { get; set; }
        public int RestaurantId { get; set; }

        // Navigation properties
        public Users User { get; set; }
        public Restaurants Restaurant { get; set; }
    }

}

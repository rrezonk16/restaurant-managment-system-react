using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    public class Workplace : BaseModel
    {
        public int UserId { get; set; }

        // Other properties
        public int RestaurantId { get; set; }
        public string Workdays { get; set; }

        // Navigation properties
        public Users User { get; set; }
        public Restaurants Restaurant { get; set; }
    }
}

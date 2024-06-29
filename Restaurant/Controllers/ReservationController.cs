using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Restaurant.DTOs;
using Restaurant.Services;

namespace Restaurant.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IRezervationService _reservationService;
        private readonly IRepository<Reservation> _repository;
        private readonly IConfiguration _configuration;

        public ReservationController(IRezervationService reservationService, IRepository<Reservation> repository, IConfiguration configuration)
        {
            _reservationService = reservationService;
            _repository = repository;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterReservation([FromBody] ReservationDTO reservationDTO, CancellationToken cancellationToken)
        {
            await _reservationService.RegisterReservation(reservationDTO, cancellationToken);
            return Ok();
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Reservation> GetReservationById(int id, CancellationToken cancellationToken)
        {
            return await _repository.Get(id, cancellationToken);
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Reservation> GetAllReservations()
        {
            return _repository.GetAll();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReservationById(int id, [FromBody] ReservationDTO reservationDTO, CancellationToken cancellationToken)
        {
            var updatedReservation = await _reservationService.UpdateReservation(id, reservationDTO, cancellationToken);
            if (updatedReservation == null) return NotFound();
            return Ok(updatedReservation);
        }

        [HttpDelete("delete-user-by-id/{id}")]
        public void DeleteReservationById(int id, CancellationToken cancellationToken)
        {
            string connectionString = "Server=.;Database=restaurant_roles;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM Reservation WHERE id = @id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    int rowsAffected = sqlCommand.ExecuteNonQuery();
                }
            }
        }

        [HttpGet]
        [Route("ByUser/{userId}")]
        public async Task<IEnumerable<Reservation>> GetReservationsByUserId(int userId, CancellationToken cancellationToken)
        {
            return await _reservationService.GetReservationsByUserIdAsync(userId, cancellationToken);
        }

        [HttpGet]
        [Route("ByRestaurant/{restaurantId}")]
        public async Task<IEnumerable<Reservation>> GetReservationsByRestaurantId(int restaurantId, CancellationToken cancellationToken)
        {
            return await _reservationService.GetReservationsByRestaurantIdAsync(restaurantId, cancellationToken);
        }
    }
}

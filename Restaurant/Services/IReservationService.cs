using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Services
{
    public interface IRezervationService
    {
        Task RegisterReservation(ReservationDTO reservationDTO, CancellationToken cancellationToken);
        Task<Reservation> GetReservationByIdAsync(int id, CancellationToken cancellationToken);
        Task<Reservation> UpdateReservation(int id, ReservationDTO reservationDTO, CancellationToken cancellationToken);

    }
}

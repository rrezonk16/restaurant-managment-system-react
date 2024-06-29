using Database.Context;
using Database.Models;
using Database.Repository;
using Microsoft.EntityFrameworkCore;
using Restaurant.DTOs;
using Restaurant.Mappings;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Services
{
    public class ReservationService : IRezervationService
    {
        private readonly IRepository<Reservation> _repository;
        private readonly ILogger<ReservationService> _logger;
        private readonly ApplicationDbContext _context;

        public ReservationService(IRepository<Reservation> repository, ILogger<ReservationService> logger, ApplicationDbContext context)
        {
            _repository = repository;
            _logger = logger;
            _context = context;
        }

        public async Task RegisterReservation(ReservationDTO reservationDTO, CancellationToken cancellationToken)
        {
            Reservation reservation = ReservationMapper.ReservationDTOToModel(reservationDTO);
            reservation.Status = "active";
            _repository.Add(reservation);
            await _repository.SaveAsync(cancellationToken);
        }

        public async Task<Reservation> GetReservationByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _repository.Get(id, cancellationToken);
        }

        public async Task<Reservation> UpdateReservation(int id, ReservationDTO reservationDTO, CancellationToken cancellationToken)
        {
            var reservation = _context.Set<Reservation>().FirstOrDefault(n => n.Id == id);

            if (reservation != null)
            {
                reservation.ReservationDate = reservationDTO.ReservationDate;
                reservation.ClientId = reservationDTO.ClientId;
                reservation.RestaurantId = reservationDTO.RestaurantId;
                reservation.TableId = reservationDTO.TableId;
                reservation.Status = reservationDTO.Status;
                reservation.Hour = reservationDTO.Hour;
                reservation.NumberOfSeats = reservationDTO.NumberOfSeats;

                _repository.Update(reservation);
                await _repository.SaveAsync(cancellationToken);
            }
            return reservation;
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByUserIdAsync(int userId, CancellationToken cancellationToken)
        {
            return await _context.Reservation
                                 .Where(r => r.ClientId == userId)
                                 .ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByRestaurantIdAsync(int restaurantId, CancellationToken cancellationToken)
        {
            return await _context.Reservation
                                 .Where(r => r.RestaurantId == restaurantId)
                                 .ToListAsync(cancellationToken);
        }
    }
}

using Database.Models;
using Restaurant.DTOs;

namespace Restaurant.Mappings
{
    public static class ReservationMapper
    {
        public static Reservation ReservationDTOToModel(ReservationDTO reservationDTO)
        {
            return new Reservation
            {
                ReservationDate = reservationDTO.ReservationDate,
                ClientId = reservationDTO.ClientId,
                RestaurantId = reservationDTO.RestaurantId,
                TableId = reservationDTO.TableId,
                Status = reservationDTO.Status,
                Hour = reservationDTO.Hour,
                NumberOfSeats = reservationDTO.NumberOfSeats,
            };


        }
    }
}


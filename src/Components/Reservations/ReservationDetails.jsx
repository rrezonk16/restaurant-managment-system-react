import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import QRCode from "qrcode.react";
import Loading from "../Loader/Loading";

const ReservationDetails = () => {
  const [reservation, setReservation] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const reservationId = new URLSearchParams(window.location.search).get("id");

    if (!reservationId) {
      return (
        <div className="bg-blue-900 flex justify-between flex-col text-white">
          <Navbar />
          <div className="container mx-auto flex flex-col justify-center my-8">
            <p>NO DATA</p>
          </div>
          <Footer />
        </div>
      );
    } else {
      axios
        .get(
          `https://localhost:7046/api/Reservation/GetReservationById/${reservationId}`
        )
        .then((response) => {
          setReservation(response.data);
          return axios.get(`https://localhost:7046/api/Restaurant/GetRestaurant/${response.data.restaurantId}`);
        })
        .then((response) => {
          setRestaurant(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reservation or restaurant data:", error);
        });
    }
  }, [navigate]);

  if (!reservation || !restaurant) {
    return (
<Loading/>
    );
  }

  return (
    <div className="bg-blue-900 flex justify-between flex-col text-white">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center my-8">
        <h1 className="text-2xl mb-4">Reservation Details</h1>
        <div className="bg-white text-black p-4 mb-4 rounded-lg shadow-lg flex flex-row justify-between items-center">
          <div>
            <p><strong>Reservation Date:</strong> {reservation.reservationDate}</p>
            <p><strong>Hour:</strong> {reservation.hour}</p>
            <p><strong>Number of Seats:</strong> {reservation.numberOfSeats}</p>
            <p><strong>Status:</strong> {reservation.status}</p>
            <p><strong>Table:</strong> {reservation.tableId}</p>
            <p><strong>Reserved At:</strong> {new Date(reservation.createdAt).toLocaleString()}</p>
            <hr className="my-4" />
            <h2 className="text-xl mb-2">Restaurant Details</h2>
            <p><strong>Name:</strong> {restaurant.name}</p>
            <p><strong>Address:</strong> {restaurant.address}</p>
            <p><strong>Open:</strong> {restaurant.openHours}</p>
          </div>
          <QRCode
            value={`http://localhost:3000/reservation?id=${reservation.id}`}
            size={128}
            level={"H"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import QRCode from 'qrcode.react';
import Loading from "../Loader/Loading";

const ViewReservation = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      navigate("/reservation");
    } else {
      axios.get(`https://localhost:7046/api/Reservation/ByUser/${userId}`)
        .then(response => {
          setReservations(response.data);
        })
        .catch(error => {
          console.error("Error fetching reservation data:", error);
        });
    }
  }, [navigate]);

  if (reservations.length === 0) {
    return (
     <Loading/>
    );
  }

  return (
    <div className="bg-blue-900 flex justify-between flex-col text-white">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center my-8">
        <h1 className="text-2xl mb-4">Reservation Details</h1>
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white text-black p-4 mb-4 rounded-lg shadow-lg flex flex-row justify-between items-center">
            <div>
            <p><strong>Reservation Date:</strong> {reservation.reservationDate}</p>
            <p><strong>Hour:</strong> {reservation.hour}</p>
            <p><strong>Number of Seats:</strong> {reservation.numberOfSeats}</p>
            <p><strong>Status:</strong> {reservation.status}</p>
            <p><strong>Table ID:</strong> {reservation.tableId}</p>
            <p><strong>Restaurant ID:</strong> {reservation.restaurantId}</p>
            <p><strong>Reserved At:</strong> {new Date(reservation.createdAt).toLocaleString()}</p>
            </div>
            <QRCode 
              value={`http://localhost:3000/reservation?id=${reservation.id}`} 
              size={128} 
              level={"H"}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ViewReservation;

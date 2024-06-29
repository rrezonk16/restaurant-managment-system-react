import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    reservationDate: "",
    hour: 0,
    numberOfSeats: 0,
    clientId: 1, // Assuming default client ID for now
    restaurantId: null, // Selected restaurant ID
    tableId: 1, // Assuming default table ID for now
    status: "active", // Default status
  });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchReservations();
    fetchRestaurants();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7046/api/Reservation/GetAllReservations"
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7046/api/Restaurant/GetAllRestaurants"
      );
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const addReservation = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7046/api/Reservation",
        newReservation
      );
      if (response.status === 200) {
        setNewReservation({
          reservationDate: "",
          hour: 0,
          numberOfSeats: 0,
          clientId: 1,
          restaurantId: null,
          tableId: 1,
          status: "active",
        });
        fetchReservations(); // Refresh the reservations list
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7046/api/Reservation/delete-user-by-id/${id}`
      );
      if (response.status === 200) {
        setReservations(
          reservations.filter((reservation) => reservation.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation({
      ...newReservation,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Reservations</h2>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Add New Reservation</h3>
        <div className="flex flex-col space-y-2">
          <input
            type="date"
            name="reservationDate"
            value={newReservation.reservationDate}
            onChange={handleInputChange}
            className="border p-2"
          />
          <input
            type="number"
            name="hour"
            value={newReservation.hour}
            onChange={handleInputChange}
            className="border p-2"
          />
          <input
            type="number"
            name="numberOfSeats"
            value={newReservation.numberOfSeats}
            onChange={handleInputChange}
            className="border p-2"
          />
          <select
            name="restaurantId"
            value={newReservation.restaurantId}
            onChange={handleInputChange}
            className="border p-2"
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          <button
            onClick={addReservation}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Reservation
          </button>
        </div>
      </div>

      {/* Table to display existing reservations */}
      <div>
        <h3 className="text-xl font-bold mb-2">Existing Reservations</h3>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Reservation Date</th>
              <th className="py-3 px-6 text-left">Hour</th>
              <th className="py-3 px-6 text-left">Number of Seats</th>
              <th className="py-3 px-6 text-left">Restaurant</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="py-3 px-6">{reservation.id}</td>
                <td className="py-3 px-6">{reservation.reservationDate}</td>
                <td className="py-3 px-6">{reservation.hour}</td>
                <td className="py-3 px-6">{reservation.numberOfSeats}</td>
                <td className="py-3 px-6">
                  {reservation.restaurant ? reservation.restaurant.name : "-"}
                </td>
                <td className="py-3 px-6">{reservation.status}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => deleteReservation(reservation.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReservations;

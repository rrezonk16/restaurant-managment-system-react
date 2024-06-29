import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import kosovo from "./kosovo.svg";
import albania from "./albania.svg";
import macedonia from "./macedonia.svg";

const MakeReservation = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [reservationIdInput, setReservationIdInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      setIsGuest(true);
    }
    fetchRestaurants();
  }, []);



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

  const handleTimeMouseEnter = (time) => {
    setHoveredTime(time);
  };

  const handleTimeMouseLeave = () => {
    setHoveredTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleMouseEnter = (value) => {
    setHoveredButton(value);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleClick = (value) => {
    setSelectedButton(value);
  };

  const handleRestaurantClick = (restaurantId) => {
    setSelectedRestaurant(restaurantId);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientId = localStorage.getItem("id");
    if (!clientId) {
      navigate("/login");
      return;
    }

    const reservationData = {
      reservationDate: selectedDate,
      hour: selectedTime,
      numberOfSeats: selectedButton,
      clientId,
      restaurantId: selectedRestaurant,
      tableId: 1,
      status: "active",
    };

    try {
      const response = await axios.post(
        "https://localhost:7046/api/Reservation",
        reservationData
      );
      console.log("Reservation successful:", response);
      if (response.status === 200) {
        navigate("/my-reservations");
      }
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  const handleViewReservation = () => {
    if (reservationIdInput.trim() !== "") {
      navigate(`/reservations?id=${reservationIdInput}`);
    }
  };

  return (
    <div className="bg-blue-900 flex flex-col text-white">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center my-8">
        {isGuest ? (
          <div className="mb-4 text-center">
            <input
              type="text"
              placeholder="Enter reservation number"
              value={reservationIdInput}
              onChange={(e) => setReservationIdInput(e.target.value)}
              className="w-full h-12 px-4 rounded-md bg-gray-800 text-white text-sm"
            />
            <button
              type="button"
              onClick={handleViewReservation}
              className="mt-4 px-6 py-3 rounded-md bg-indigo-600 text-white font-bold hover:bg-indigo-700"
            >
              View Reservation
            </button>
          </div>
        ) : (
          <div className="mb-4 text-center">
            <a href={`/my-reservations`}>View my reservations</a>
          </div>
        )}
        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="time" className="block text-white font-bold mb-2">
              Select Restaurant:
            </label>
            <div className="flex w-full gap-4 ">
              {restaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  type="button"
                  className={`px-4 py-2 rounded-md bg-gray-800 text-white w-1/3 ${
                    selectedRestaurant === restaurant.id
                      ? "bg-green-800"
                      : "hover:bg-green-700 active:bg-green-800"
                  }`}
                  onClick={() => handleRestaurantClick(restaurant.id)}
                >
                  {restaurant.name}
                  {(() => {
                    switch (restaurant.name) {
                      case "Prishtina":
                        return <img src={kosovo} alt="Kosovo flag" />;
                      case "Tirana":
                        return <img src={albania} alt="Albania flag" />;
                      case "Skopje":
                        return <img src={macedonia} alt="Macedonia flag" />;
                      default:
                        return null;
                    }
                  })()}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-white font-bold mb-2">
              Select Date:
            </label>
            <div className="flex w-full gap-4 ">
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full h-28 px-1 rounded-md bg-gray-800 text-white text-sm p-4"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-white font-bold mb-2">
              Select Time:
            </label>
            <div className="flex space-x-2">
              {[8, 9, 10, 11].map((hour) => (
                <button
                  key={hour}
                  type="button"
                  className={`px-4 py-2 rounded-md bg-gray-800 text-white ${
                    (selectedTime && hour === selectedTime) ||
                    (hoveredTime && hour <= hoveredTime)
                      ? "bg-green-600"
                      : "hover:bg-green-600"
                  }`}
                  onMouseEnter={() => handleTimeMouseEnter(hour)}
                  onMouseLeave={handleTimeMouseLeave}
                  onClick={() => handleTimeClick(hour)}
                >
                  {hour}:00 PM
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-white font-bold mb-2">
              Number of people
            </label>
            <div className="flex justify-between ">
              {[1, 2, 3, 4, 5, 6, 7].map((people) => (
                <button
                  key={people}
                  type="button"
                  className={`px-4 py-2 rounded-md bg-gray-800 text-white ${
                    (selectedButton && people <= selectedButton) ||
                    (hoveredButton && people <= hoveredButton)
                      ? "bg-green-800"
                      : "hover:bg-green-600"
                  }`}
                  onMouseEnter={() => handleMouseEnter(people)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(people)}
                >
                  {people}
                </button>
              ))}
            </div>
          </div>
          {isGuest && (
            <div className="mb-4">
              <label
                htmlFor="guestEmail"
                className="block text-white font-bold mb-2"
              >
                Guest Email:
              </label>
              <input
                type="email"
                id="guestEmail"
                name="guestEmail"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-indigo-600 text-white font-bold hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default MakeReservation;

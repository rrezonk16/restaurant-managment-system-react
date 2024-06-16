import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import kosovo from "./kosovo.svg";
import albania from "./albania.svg";
import macedonia from "./macedonia.svg";

const MakeReservation = () => {
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // New state for selected date
  const navigate = useNavigate(); // Hook for navigation

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

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const todayDate = new Date();
    const dd = String(todayDate.getDate()).padStart(2, "0");
    const mm = String(todayDate.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = todayDate.getFullYear();
    setToday(`${dd}.${mm}.${yyyy}`);

    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dd_tomorrow = String(tomorrowDate.getDate()).padStart(2, "0");
    const mm_tomorrow = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
    const yyyy_tomorrow = tomorrowDate.getFullYear();
    setTomorrow(`${dd_tomorrow}.${mm_tomorrow}.${yyyy_tomorrow}`);
  }, []);

  useEffect(() => {
    document.title = 'Reserve';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientId = localStorage.getItem("id");
    if (!clientId) {
      navigate("/login");
      return;
    }

    console.log(selectedDate); 
    const reservationData = {
      selectedDate,
      clientId,
      restaurantId: selectedRestaurant, // Assuming restaurant ID is the same as selectedRestaurant
      tableId: 21,
      status: "active",
      numberOfSeats: selectedButton,
      hour: selectedTime
    };

    try {
      const response = await axios.post("https://localhost:7046/api/Reservation", reservationData);
      console.log("Reservation successful:", response);
      if (response.status===200) {
        navigate("/my-reservations")
      }
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div className="bg-blue-900 flex justify-between flex-col text-white ">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center my-8">
        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="time" className="block text-white font-bold mb-2">
              Select Restaurant:
            </label>
            <div className="flex w-full gap-4 ">
              <button
                type="button"
                className={`px-4 py-2 rounded-md bg-gray-800 text-white w-1/3 ${
                  selectedRestaurant === "2"
                    ? "bg-green-800"
                    : "hover:bg-green-700 active:bg-green-800"
                }`}
                onClick={() => handleRestaurantClick("2")}
              >
                Prishtina
                <img src={kosovo} alt="" className="" />
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md bg-gray-800 text-white w-1/3 ${
                  selectedRestaurant === "4"
                    ? "bg-green-800"
                    : "hover:bg-green-700 active:bg-green-800"
                }`}
                onClick={() => handleRestaurantClick("4")}
              >
                Tirana
                <img src={albania} alt="" className="" />
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md bg-gray-800 text-white w-1/3 ${
                  selectedRestaurant === "3"
                    ? "bg-green-800"
                    : "hover:bg-green-700 active:bg-green-800"
                }`}
                onClick={() => handleRestaurantClick("3")}
              >
                Skopje
                <img src={macedonia} alt="" className="" />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-white font-bold mb-2">
              Select Date:
            </label>
            <div className="flex w-full gap-4 ">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-800 text-white w-1/3"
                onClick={() => setSelectedDate(today)}
              >
                Today
                <br />
                {today}
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-800 text-white w-1/3"
                onClick={() => setSelectedDate(tomorrow)}
              >
                Tomorrow
                <br />
                {tomorrow}
              </button>
              <input
                type="date"
                id="date"
                name="date"
                className="w-1/3 h-28 px-1 rounded-md bg-gray-800 text-white text-sm"
                onChange={handleDateChange}
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
                    (selectedTime && hour === selectedTime) || (hoveredTime && hour <= hoveredTime)
                      ? 'bg-green-600'
                      : 'hover:bg-green-600'
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

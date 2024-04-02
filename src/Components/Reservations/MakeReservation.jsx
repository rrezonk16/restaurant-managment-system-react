import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import kosovo from "./kosovo.svg";
import albania from "./albania.svg";
import macedonia from "./macedonia.svg";

const MakeReservation = () => {
  const [today, setToday] = useState('');
  const [tomorrow, setTomorrow] = useState('');

  useEffect(() => {
    const todayDate = new Date();
    const dd = String(todayDate.getDate()).padStart(2, '0');
    const mm = String(todayDate.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = todayDate.getFullYear();
    setToday(`${dd}.${mm}.${yyyy}`);

    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dd_tomorrow = String(tomorrowDate.getDate()).padStart(2, '0');
    const mm_tomorrow = String(tomorrowDate.getMonth() + 1).padStart(2, '0');
    const yyyy_tomorrow = tomorrowDate.getFullYear();
    setTomorrow(`${dd_tomorrow}.${mm_tomorrow}.${yyyy_tomorrow}`);
  }, []);

  return (
    <div className="bg-blue-900 flex justify-between flex-col text-white ">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center my-14">
        <form className="w-full max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="time" className="block text-white font-bold mb-2">
              Select Restaurant:
            </label>
            <div className="flex w-full gap-4 ">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-800 text-white w-1/3"
              >
                Prishtina
                <img src={kosovo} alt="" className="" />
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-800 text-white w-1/3"
              >
                Tirana
                <img src={albania} alt="" className="" />
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-800 text-white w-1/3"
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
              >
                Today
                <br />
                {today}

              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-800 text-white w-1/3"
              >
                Tomorrow
                <br />
                {tomorrow}

              </button>
              <input
                type="date"
                id="date"
                name="date"
                className="w-1/3 h-28 px-2 rounded-md bg-gray-800 text-white text-sm"
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
                  className="px-4 py-2 rounded-md bg-gray-800 text-white"
                  onClick={() => console.log(`${hour}:00 PM`)}
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
                  className=" active:bg-green-500 after:bg-gray-200 hover:bg-green-600 px-4 py-2 rounded-md bg-gray-800 text-white"
                  onClick={() => console.log(`${people}`)}
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

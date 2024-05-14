import React, { useState } from "react";
import rrezon from "../Images/rrezon.jpg";

const ManageEmployees = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  return (
    <div>
      <div className="mt-5 border border-black w-full rounded-xl py-3 px-4 flex justify-between flex-col gap-3 md:flex-row items-center">
        <div className="flex flex-row items-center gap-2">
          <img src={rrezon} alt="profile" className="w-24 h-24 rounded-xl" />
          <div>
            <p className="font-semibold">Name: Rrezon Krasniqi</p>
            <p>Birthday: 20.05.2004</p>
            <p>Restaurant: Prishtina</p>
            <p>Position: Branch Manager</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className="bg-gray-900 px-6 py-3 rounded-xl cursor-pointer text-center hover:bg-gray-700"
            onClick={toggleSchedule}
          >
            <p className="text-white">Open Schedule</p>
          </div>
          <div
            className="bg-gray-900 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-700"
            onClick={toggleSchedule}
          >
            <p className="text-white">Read Employee Information</p>
          </div>
        </div>
      </div>

      {isScheduleOpen && (
        <div className="flex flex-row gap-4 mt-4">
          <div className="flex-1 bg-green-700 p-4 rounded-lg text-center">
            <p className="text-white font-semibold">Monday</p>
            <p className="text-white">10:00AM - 6:00PM</p>
          </div>
          <div className="flex-1 bg-green-700 p-4 rounded-lg text-center">
            <p className="text-white font-semibold">Tuesday</p>
            <p className="text-white">10:00AM - 6:00PM</p>
          </div>
          <div className="flex-1 bg-green-700 p-4 rounded-lg text-center">
            <p className="text-white font-semibold">Wednesday</p>
            <p className="text-white">10:00AM - 6:00PM</p>
          </div>
          <div className="flex-1 bg-green-700 p-4 rounded-lg text-center">
            <p className="text-white font-semibold">Thursday</p>
            <p className="text-white">10:00AM - 6:00PM</p>
          </div>
          <div className="flex-1 bg-green-700 p-4 rounded-lg text-center">
            <p className="text-white font-semibold">Friday</p>
            <p className="text-white">10:00AM - 6:00PM</p>
          </div>
          <div className="flex-1 bg-red-700 p-4 rounded-lg text-center">
            <p className="text-white font-semibold">Saturday</p>
            <p className="text-white">Day Off</p>
          </div>
          <div className="flex-1 bg-green-700 p-4 rounded-lg text-center">
            <p className="text-white font-semibold">Sunday</p>
            <p className="text-white">10:00AM - 6:00PM</p>
          </div>
        </div>
      )}





      
    </div>
  );
};

export default ManageEmployees;

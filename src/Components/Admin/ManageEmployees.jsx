import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageEmployees = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [workplaceData, setWorkplaceData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);

  const toggleSchedule = async (userId) => {
    setIsScheduleOpen(!isScheduleOpen);

    try {
      // Fetch workplace data
      const workplaceResponse = await axios.get(`https://localhost:7046/api/Workplace/user/${userId}`);
      const parsedWorkdays = JSON.parse(workplaceResponse.data.workdays); // Parse the workdays string to an array
      setWorkplaceData({ ...workplaceResponse.data, workdays: parsedWorkdays });

      // Fetch restaurant data
      const restaurantId = workplaceResponse.data.restaurantId;
      const restaurantResponse = await axios.get(`https://localhost:7046/api/Restaurant/GetRestaurant/${restaurantId}`);
      setRestaurantData(restaurantResponse.data);
    } catch (error) {
      console.error("Error fetching workplace or restaurant data:", error);
    }
  };

  const fetchEmployees = async () => {
    const token = localStorage.getItem('token'); // Adjust the key if your token is stored under a different key

    try {
      const response = await axios.get("https://localhost:7046/api/User/GetUsersByRoleId/4", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      {employees.map((employee, index) => (
        <div key={index} className="mt-5 border border-black w-full rounded-xl py-3 px-4 flex justify-between flex-col gap-3 md:flex-row items-center">
          <div className="flex flex-row items-center gap-2">
            <div>
              <p className="font-semibold">Name: {employee.name} {employee.surname}</p>
              <p>Birthday: {new Date(employee.birthday).toLocaleDateString()}</p>
              <p>Email: {employee.email}</p>
              <p>Phone Number: {employee.phoneNumber || "N/A"}</p>
              <p>Contract Due Date: {new Date(employee.contractDueDate).toLocaleDateString()}</p>
              <p>Status: {employee.status}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className="bg-gray-900 px-6 py-3 rounded-xl cursor-pointer text-center hover:bg-gray-700"
              onClick={() => toggleSchedule(employee.id)}
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
      ))}

      {isScheduleOpen && workplaceData && (
        <div className="mt-5 border border-black w-full rounded-xl py-3 px-4">
          <p className="font-semibold">Work Schedule</p>
          <div className="flex flex-row gap-4 mt-4">
            <div className={`flex-1 p-4 rounded-lg text-center ${workplaceData.workdays[0] === 1 ? 'bg-green-700' : 'bg-red-700'}`}>
              <p className="text-white font-semibold">Monday</p>
              <p className="text-white">{workplaceData.workdays[0] === 1 ? '10:00AM - 6:00PM' : 'Day Off'}</p>
            </div>
            <div className={`flex-1 p-4 rounded-lg text-center ${workplaceData.workdays[1] === 1 ? 'bg-green-700' : 'bg-red-700'}`}>
              <p className="text-white font-semibold">Tuesday</p>
              <p className="text-white">{workplaceData.workdays[1] === 1 ? '10:00AM - 6:00PM' : 'Day Off'}</p>
            </div>
            <div className={`flex-1 p-4 rounded-lg text-center ${workplaceData.workdays[2] === 1 ? 'bg-green-700' : 'bg-red-700'}`}>
              <p className="text-white font-semibold">Wednesday</p>
              <p className="text-white">{workplaceData.workdays[2] === 1 ? '10:00AM - 6:00PM' : 'Day Off'}</p>
            </div>
            <div className={`flex-1 p-4 rounded-lg text-center ${workplaceData.workdays[3] === 1 ? 'bg-green-700' : 'bg-red-700'}`}>
              <p className="text-white font-semibold">Thursday</p>
              <p className="text-white">{workplaceData.workdays[3] === 1 ? '10:00AM - 6:00PM' : 'Day Off'}</p>
            </div>
            <div className={`flex-1 p-4 rounded-lg text-center ${workplaceData.workdays[4] === 1 ? 'bg-green-700' : 'bg-red-700'}`}>
              <p className="text-white font-semibold">Friday</p>
              <p className="text-white">{workplaceData.workdays[4] === 1 ? '10:00AM - 6:00PM' : 'Day Off'}</p>
            </div>
            <div className={`flex-1 p-4 rounded-lg text-center ${workplaceData.workdays[5] === 1 ? 'bg-green-700' : 'bg-red-700'}`}>
              <p className="text-white font-semibold">Saturday</p>
              <p className="text-white">{workplaceData.workdays[5] === 1 ? '10:00AM - 6:00PM' : 'Day Off'}</p>
            </div>
            <div className={`flex-1 p-4 rounded-lg text-center ${workplaceData.workdays[6] === 1 ? 'bg-green-700' : 'bg-red-700'}`}>
              <p className="text-white font-semibold">Sunday</p>
              <p className="text-white">{workplaceData.workdays[6] === 1 ? '10:00AM - 6:00PM' : 'Day Off'}</p>
            </div>
          </div>
        </div>
        
      )}

  {isScheduleOpen && restaurantData && (
        <div className="mt-5 border border-black w-full rounded-xl py-3 px-4">
          <p className="font-semibold">Restaurant Information</p>
          <p>Name: {restaurantData.name}</p>
          <p>Address: {restaurantData.address}</p>
          <p>Open Hours: {restaurantData.openHours}</p>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;

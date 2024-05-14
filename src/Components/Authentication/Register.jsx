import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/logo.png";
import LemonHalf from "../Error/Lemonhalf.png";
import LemonCerek from "../Error/LemonCerek.png";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
 const navigate = useNavigate();
  const handleSubmit = async (e) => { // Make the function asynchronous
    e.preventDefault();
    const { firstName, lastName, phoneNumber, email, password } = formData;
    const birthday = new Date().toISOString(); // Current date and time

    // Format the data
    const formattedData = {
      name: firstName,
      surname: lastName,
      email,
      phoneNumber,
      password,
      birthday
    };

    try {
      const response = await axios.post("https://localhost:7046/api/User/Register", formattedData);
      console.log("Registration successful:", response);
        if(response.status === 200){
          localStorage.setItem('role', 'admin');

          navigate("/")

        }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  useEffect(() => {
    document.title = 'Register';
  }, []);  
  return (
    <div className="bg-blue-900 h-screen flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-96 mb-4 z-50" />
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg px-8 pb-2 pt-4 shadow-lg text-center  z-50">
        <h1 className="text-center text-2xl mb-2">Register</h1>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400" />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Sign Up
        </button>
        <div className="mt-4 flex flex-row justify-between gap-5">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/login" className="text-blue-400 hover:text-blue-500">
            Login
          </Link>
        </div>
      </form>

      <img
        src={LemonHalf}
        alt=""
        className="absolute top-0 left-0 md:block hidden"
      />
          <img
        src={LemonCerek}
        alt=""
        className="absolute top-0 left-0 rotate-180 w-1/3  sm:hidden"
      />
        <img
        src={LemonHalf}
        alt=""
        className="absolute bottom-0 right-0 z-0 rotate-180 sm:hidden"
      />
      <img
        src={LemonCerek}
        alt=""
        className="absolute bottom-0 right-0 md:block hidden"
      />
    </div>
  );
};

export default Register;

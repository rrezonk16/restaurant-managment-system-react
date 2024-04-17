import axios from "axios"; // Import Axios
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/logo.png";
import LemonHalf from "../Error/Lemonhalf.png";
import LemonCerek from "../Error/LemonCerek.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate= useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7046/api/User/LogIn",
        formData
      ); 

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/");
        console.log(response)
        localStorage.setItem('token', response.data);
        localStorage.setItem('role', 'admin');

      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="bg-blue-900 h-screen  flex flex-col justify-center items-center relative">
      <div className="flex flex-col  items-center ">
        <img src={Logo} alt="Logo" className=" w-96 mb-4 z-50" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 shadow-lg text-center z-50"
      >
        <h1 className="text-center text-2xl mb-7 ">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign In
        </button>
        <div className="mt-4 flex flex-row gap-5">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/register" className="text-blue-400 hover:text-blue-500">
            Sign Up
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

export default Login;

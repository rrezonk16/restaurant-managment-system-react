import axios from "axios"; // Import Axios
import React, { useEffect, useState } from "react";
import Logo from "../Images/logo.png";
import LemonHalf from "../Error/Lemonhalf.png";
import LemonCerek from "../Error/LemonCerek.png";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errorMessage, setErrorMesagge] = useState("");
  //eslint-disable-next-line
  const [isCheckEmailModalOpen, setisCheckEmailModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value,
      },
      setErrorMesagge(" ")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7046/api/User/LogIn",
        formData
      );
//setisCheckEmailModalOpen after 200 is email sent
      if (response.status === 200) {
        console.log("Login successful");
        navigate("/");
        console.log(response);
        localStorage.setItem("token", response.data);
        localStorage.setItem("role", "admin");
      } else {
        console.log(response.data);
        console.error("Login failed");
      }
    } catch (error) {
      setErrorMesagge(error.response.data);
      console.log(errorMessage);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    document.title = "Email";
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
        <h1 className="text-center text-2xl mb-7 ">Forgot password</h1>
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

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {isCheckEmailModalOpen && (
        <div
          id="emailSentModal"
          tabindex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center h-full backdrop-blur-lg "
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h2 className="text-lg font-medium">Check your email</h2>
              </div>
              <p className="text-base">We've sent a code to your email.</p>
              <a href="/add-code">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                  Continue
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

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

export default ForgotPassword;

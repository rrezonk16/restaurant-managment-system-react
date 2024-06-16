// import axios from "axios"; // Import Axios
import React, { useEffect, useState } from "react";
import Logo from "../Images/logo.png";
import LemonHalf from "../Error/Lemonhalf.png";
import LemonCerek from "../Error/LemonCerek.png";

const AddNewPassword = () => {
  useEffect(() => {
    document.title = "Recreate Password";
  }, []);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password.length < 6) {
      setError("Password must be longer than 6 characters.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      // Proceed with form submission (e.g., make an API call)
      console.log("Form submitted:", formData);
      // axios.post('/your-endpoint', formData)
      //   .then(response => {
      //     console.log("Response:", response);
      //   })
      //   .catch(error => {
      //     console.error("There was an error submitting the form!", error);
      //   });
    }
  };

  return (
    <div className="bg-blue-900 h-screen flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-96 mb-4 z-50" />
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg text-center z-50">
        <h1 className="text-center text-2xl mb-7">Recreate Password</h1>
       
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            New Password
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Submit
        </button>
      </form>

      <img src={LemonHalf} alt="" className="absolute top-0 left-0 md:block hidden" />
      <img src={LemonCerek} alt="" className="absolute top-0 left-0 rotate-180 w-1/3 sm:hidden" />
      <img src={LemonHalf} alt="" className="absolute bottom-0 right-0 z-0 rotate-180 sm:hidden" />
      <img src={LemonCerek} alt="" className="absolute bottom-0 right-0 md:block hidden" />
    </div>
  );
};

export default AddNewPassword;

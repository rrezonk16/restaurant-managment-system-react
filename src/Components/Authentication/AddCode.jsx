// import axios from "axios"; // Import Axios
import React, { useEffect, useState, useRef } from "react";
import Logo from "../Images/logo.png";
import LemonHalf from "../Error/Lemonhalf.png";
import LemonCerek from "../Error/LemonCerek.png";
// import { useNavigate } from "react-router-dom";

const AddCode = () => {
  useEffect(() => {
    document.title = "Add Code";
  }, []);

  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if the current one is filled
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //eslint-disable-next-line
    const finalCode = code.join("");
  };

  return (
    <div className="bg-blue-900 h-screen flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-96 mb-4 z-50" />
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg text-center z-50">
        <h1 className="text-center text-2xl mb-7">Enter Code</h1>
        <div className="mb-4 flex justify-center space-x-2">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              className="border-gray-300 rounded-md px-4 py-2 w-16 text-center focus:outline-none focus:ring-2 ring-2 focus:ring-blue-800 ring-blue-400"
            />
          ))}
        </div>
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

export default AddCode;

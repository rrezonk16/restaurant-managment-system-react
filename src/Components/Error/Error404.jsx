import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import Lemon from "./404Lemon.png";
import LemonHalf from "./Lemonhalf.png"
import LemonCerek from "./LemonCerek.png"


const Error404 = () => {

  return (
    <div> 
    <div className="bg-blue-900 flex flex-col my-10 ">
      <div className="text-center flex flex-col  items-center text-4xl text-blue-400">
        <img src={Lemon} alt="Lemon" className="" />
        <h2>Page Not Found</h2>
        <Link
          to="/"
          className="mt-10 px-4 py-2 text-2xl flex flex-row items-center align-middle bg-white text-black rounded-full hover:bg-gray-300 transition-colors duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24" // Adjust width as needed
            height="24" // Adjust height as needed
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6 12H18M6 12L11 7M6 12L11 17"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          Back to Home
        </Link>
      </div>
      <div>
        .
      </div>
      <img src={LemonHalf} alt="" className="absolute top-0 left-0 md:block hidden" />
      <img src={LemonCerek} alt="" className="absolute bottom-0 right-0 md:block hidden" />
    </div>
    </div>

  );
};

export default Error404;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import kosovo from "./kosovo.svg";
import albania from "./albania.svg";
import macedonia from "./macedonia.svg";

const ViewReservation = () => {

  const navigate = useNavigate(); // Hook for navigation



  return (
    <div className="bg-blue-900 flex justify-between flex-col text-white ">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center my-8">
       
      </div>
      <Footer />
    </div>
  );
};

export default ViewReservation;

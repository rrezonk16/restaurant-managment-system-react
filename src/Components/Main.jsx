import React from "react";
import logo from "./Images/logo.png";
import "../App.css";
import Navbar from "./Navigation/Navbar";

const scrollToSection2 = () => {
  const scrolldiv = document.getElementById("section2");
  if (scrolldiv) {
    window.scrollTo({
      top: scrolldiv.offsetTop,
      behavior: "smooth",
    });
  }
};

const Main = () => {
  return (
    <div>
      <div className="h-screen full-width bg-gray-900 flex flex-col justify-center items-center"        id="section1"
>
        <img src={logo} alt="eatwell" className="py-4 " />
        <span onClick={scrollToSection2} className="arrow"></span>
      </div>
      <Navbar />
      <div
        className="h-screen full-width bg-blue-900 flex flex-col pt-24"
        id="section2"
      >
        <div className="container ">
          <div className="flex flex-row w-full justify-between">
            <span className=" text-white text-4xl font-bold">
              Prishtina, Kosovo
            </span>
          </div>
          <div>
            <span className="text-white text-xl italic font-bold">
              Located in the center of Prishtina the Capital City of Kosovo.
            </span>
          </div>
        </div>
      </div>

      <div
        className="h-screen full-width bg-red-900 flex flex-col  pt-24 "
        id="section3"
      >
        <div className="container ">
          <div className="flex flex-row w-full justify-between">
            <span className=" text-white text-4xl font-bold">
              Tirana, Albania
            </span>
          </div>
          <div>
            <span className="text-white text-xl italic font-bold">
              Located in the center of *** the Capital City of ***.
            </span>
          </div>
        </div>{" "}
      </div>

      <div
        className="h-screen full-width  bg-yellow-700 flex flex-col  pt-24"
        id="section4"
      >
        <div className="container ">
          <div className="flex flex-row w-full justify-between">
            <span className=" text-white text-4xl font-bold">
              Skopje, North Macedonia
            </span>
          </div>
          <div>
            <span className="text-white text-xl italic font-bold">
              Located in the center of *** the Capital City of ***.
            </span>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Main;

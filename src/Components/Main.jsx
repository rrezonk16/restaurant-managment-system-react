import React, { useEffect } from "react";
import logo from "./Images/logo.png";
import "../App.css";
import Navbar from "./Navigation/Navbar";
// import image1 from "./Images/Restaurants/inside1.jpg"
// import image2 from "./Images/Restaurants/inside2.jpg"
// import image3 from "./Images/Restaurants/inside3.jpg"
// import image4 from "./Images/Restaurants/inside4.jpg"
// import image5 from "./Images/Restaurants/inside6.jpg"
// import image6 from "./Images/Restaurants/out1.jpg"
// import image7 from "./Images/Restaurants/out2.jpg"
// import image8 from "./Images/Restaurants/plate1.jpg"
// import image9 from "./Images/Restaurants/plate2.jpg"
// import image10 from "./Images/Restaurants/plate3.jpg"
// import image11 from "./Images/Restaurants/plate4.jpg"
// import image12 from "./Images/Restaurants/plate5.jpg"
import kosovo from "./Reservations/kosovo.svg";
import albania from "./Reservations/albania.svg";
import macedonia from "./Reservations/macedonia.svg";
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
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secondVisit = params.get("second-visit");
    if (secondVisit === "1") {
      scrollToSection2();
    }
  }, []);

  return (
    <div>
      <div
        className="h-screen full-width bg-gray-900 flex flex-col justify-center items-center"
        id="section1"
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
          <div className="w-full">
            <p className=" text-white text-4xl md:text-9xl font-bold caveat portrait:text-7xl">
              Prishtina
            </p>
            <p className=" text-white text-4xl md:text-9xl font-bold portrait:text-6xl">
              Kosova
            </p>
            <div className=" text-white text-4xl md:text-9xl portrait:text-6xl font-bold flex flex-row text-center items-center">
              XK <img src={kosovo} className="md:w-1/6 w-1/4" alt="" />
            </div>
          </div>
          <div>
          <span className="text-white portrait:text-l landscape:text-xl italic font-bold">
              Experience the heartbeat of Prishtina, Kosovo's capital, from our
              central location. Situated in the bustling city center, our spot
              offers easy access to the best of Prishtina's vibrant culture and
              rich history. Discover the essence of Kosovo's capital right from
              our doorstep.{" "}
            </span>
            <br />{" "}
            <button className="button-23 mt-8 portrait:block landscape:hidden bg-white border border-black rounded-lg py-3 px-6 text-black font-semibold text-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-50 transition duration-200 ease-in-out disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed">
              Reserve Now
            </button>
          </div>
        </div>
      </div>

      <div
        className="h-screen full-width bg-red-900 flex flex-col  pt-24 "
        id="section3"
      >
        <div className="container ">
          <div className="w-full">
            <p className=" text-white text-4xl md:text-9xl font-bold caveat portrait:text-7xl">
              Tirana
            </p>
            <p className=" text-white text-4xl md:text-9xl font-bold portrait:text-6xl">
              Albania
            </p>
            <div className=" text-white text-4xl md:text-9xl portrait:text-6xl font-bold flex flex-row text-center items-center">
              AL <img src={albania} className="md:w-1/6 w-1/4" alt="" />
            </div>
          </div>
          <div>
            <span className="text-white portrait:text-l landscape:text-xl italic font-bold">
              Discover the essence of Albanian cuisine at our restaurant,
              centrally located in the vibrant city of Tirana. Our menu is a
              celebration of local flavors, blending traditional Albanian dishes
              with modern culinary techniques. Join us for an unforgettable
              dining experience, where every bite tells a story of Albania's
              rich cultural heritage
            </span>
            <br />
            <button className="button-23 mt-8 portrait:block landscape:hidden bg-white border border-black rounded-lg py-3 px-6 text-black font-semibold text-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-50 transition duration-200 ease-in-out disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed">
              Reserve Now
            </button>
          </div>
        </div>{" "}
      </div>

      <div
        className="h-screen full-width  bg-yellow-700 flex flex-col  pt-24"
        id="section4"
      >
        <div className="container ">
          <div className="w-full">
            <p className=" text-white text-4xl md:text-9xl font-bold caveat portrait:text-7xl">
              Skopje
            </p>
            <p className=" text-white text-4xl md:text-9xl font-bold portrait:text-6xl">
              Macedonia
            </p>
            <div className=" text-white text-4xl md:text-9xl portrait:text-6xl font-bold flex flex-row text-center items-center">
              MK <img src={macedonia} className="md:w-1/6 w-1/4" alt="" />
            </div>
          </div>
          <div>
          <span className="text-white portrait:text-l landscape:text-xl italic font-bold">
              Discover the vibrant soul of Skopje, the lively capital of North
              Macedonia, from our central hub. Tucked away in the bustling core
              of Skopje, our location offers a gateway to the city's pulsating
              streets, historic landmarks, and rich cultural tapestry.
              Experience the unique charm of Skopje, right at the heart of it
              all.
            </span>
            <br />{" "}
            <button className="button-23 mt-8 portrait:block landscape:hidden bg-white border border-black rounded-lg py-3 px-6 text-black font-semibold text-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-50 transition duration-200 ease-in-out disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed">
              Reserve Now
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Main;

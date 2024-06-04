import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";

const FoodMenu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7046/api/Menu/GetMenus"
        );
        console.log(response.data);
        setMenus(response.data); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    document.title = "Menu";
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container my-32 flex flex-wrap gap-8 justify-between">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-64 duration-500 group overflow-hidden relative rounded bg-neutral-800 text-neutral-50 p-4 flex flex-col justify-evenly"
          >
            <div className="absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
            <div className="absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12"></div>
            <div className="absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
            <div className="absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
            <div className="z-10 flex flex-col justify-evenly w-full h-full">
              <span className="text-2xl font-bold">{menu.name}</span>
              <p>{menu.description}</p>
              <a
                href={`/Menu-items?id=${menu.id}`}
                className="hover:bg-neutral-200 bg-neutral-50 rounded text-neutral-800 font-extrabold w-full p-3 text-center"
              >
                See more
              </a>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FoodMenu;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";

const MenuItems = () => {
  const [menu, setMenu] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const menuId = query.get("id");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
            `https://localhost:7046/api/Menu/GetMenu/${menuId}`

        );
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    if (menuId) {
      fetchMenu();
    }
  }, [menuId]);

  useEffect(() => {
    document.title = "Menu Details";
  }, []);

  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container my-32 text-white">
        <h1 className="text-3xl font-bold mb-2">{menu.name}</h1>
        <p className="text-lg mb-4">{menu.description}</p>
        <p className="text-lg mb-4">Chef: {menu.chefId}</p>

        <div className="mb-8 text-white">
          <div className="flex justify-between border-b py-2">
            <span>Pizza</span>
            <span>1.00 Euro</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Burger</span>
            <span>2.50 Euro</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Pasta</span>
            <span>3.00 Euro</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Salad</span>
            <span>1.50 Euro</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Soda</span>
            <span>0.99 Euro</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuItems;

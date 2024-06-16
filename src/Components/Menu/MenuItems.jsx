import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";

const MenuItems = () => {
  const [menu, setMenu] = useState(null);
  const [menuItems, setMenuItems] = useState(null);
  const [chef, setChef] = useState(null);

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
        // Fetch chef data only when menu is fetched successfully
        fetchChef(response.data.chefId);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    const fetchChef = async (chefId) => {
      try {
        const response = await axios.get(
          `https://localhost:7046/api/User/GetUser/${chefId}`
        );
        setChef(response.data);
      } catch (error) {
        console.error("Error fetching chef:", error);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7046/api/MenuItem/GetMenuItemsByMenuID/${menuId}`
        );
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    if (menuId) {
      fetchMenu();
      fetchMenuItems();
    }
  }, [menuId]);

  useEffect(() => {
    document.title = "Menu Details";
  }, []);

  if (!menu || !menuItems) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container my-32 text-white">
        <h1 className="text-3xl font-bold mb-2">{menu.name}</h1>
        <p className="text-lg mb-4">{menu.description}</p>
        {chef && <p className="text-lg mb-4">Chef: {chef.name} {chef.surname}</p>}

        <div className="mb-8 text-white">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="flex justify-between border-b py-2">
                <span>{item.name}</span>
                <span>Price not specified</span>
              </div>
              <span className="text-gray-400">{item.ingredients}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuItems;

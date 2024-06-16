import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";

const UserOrder = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios
      .get("https://localhost:7046/api/MenuItem/GetAllMenuItems")
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleSubmitOrder = () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      navigate("/login");
      return;
    }

    const orderData = {
      price: 0,
      status: "active",
      tableId: 20,
      userID: userId,
      menuItemIds: selectedItems,
    };

    axios
      .post("https://localhost:7046/api/Order/RegisterOrder", orderData)
      .then((response) => {
        console.log("Order registered successfully:", response);
if (response.status===200) {
  navigate(`/order-bill?id=${response.data.orderId}`)
}
      })
      .catch((error) => {
        console.error("Error registering order:", error);
      });
  };

  return (
    <div className="bg-blue-900 flex flex-col justify-between text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center my-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Select Menu Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`border p-4 rounded shadow-md flex flex-col items-center ${
                selectedItems.includes(item.id) ? "bg-green-700" : "bg-gray-800"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="mb-2">{item.ingredients}</p>
              <button
                onClick={() => handleSelectItem(item.id)}
                className={`px-4 py-2 rounded-md font-bold ${
                  selectedItems.includes(item.id)
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {selectedItems.includes(item.id) ? "Deselect" : "Select"}
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmitOrder}
            className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-bold"
          >
            Submit Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserOrder;

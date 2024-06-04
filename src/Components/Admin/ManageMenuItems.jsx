import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageMenuItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [chef, setChef] = useState("3");
  const [status, setStatus] = useState("active");
  const [menuID, setMenuID] = useState(null);
  const [isAddModal, setIsAddModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Function to extract menuID from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("Id");
    setMenuID(id);
  }, []);

  const FormatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  useEffect(() => {
    // Fetch all menu items
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("https://localhost:7046/api/MenuItem/GetAllMenuItems");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      price,
      ingredients,
      menuID: parseInt(menuID),
      status,
    };

    try {
      const response = await axios.post(
        "https://localhost:7046/api/MenuItem/AddMenuItem",
        data,
      );
      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="bg-gray-800 p-3 sm:p-5 antialiased rounded-2xl">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4">
              <div className="w-full md:w-1/2">
                <button
                  onClick={() => setIsAddModal(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add new Item
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">Name</th>
                    <th scope="col" className="px-4 py-3">Price</th>
                    <th scope="col" className="px-4 py-3">Created On</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3 flex items-center justify-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((menuItem) => (
                    <tr key={menuItem.id} className="border-b dark:border-gray-700 text-white hover:bg-gray-700 cursor-pointer">
                      <td className="px-4 py-3">{menuItem.name}</td>
                      <td className="px-4 py-3">{menuItem.price}</td>

                      <td className="px-4 py-3">{FormatDate(menuItem.createdAt)}</td>
                      <td className="px-4 py-3">{menuItem.status}</td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {isAddModal && (
        <div id="updateProductModal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center h-full backdrop-blur-lg">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Item to this menu</h3>
                <h3 onClick={() => setIsAddModal(false)} className="text-lg font-semibold text-red-600 cursor-pointer">Close</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="Chef" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chef</label>
                    <select
                      id="Chef"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={chef}
                      onChange={(e) => setChef(e.target.value)}
                    >
                      <option value="3">Rrezon</option>
                      <option value="4">Gordon</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <select
                      id="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="ingredients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredients</label>
                    <textarea
                      type="text"
                      rows={4}
                      name="ingredients"
                      id="ingredients"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none border border-blue-500 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenuItems;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageMenuItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [chef, setChef] = useState('');
  const [chefs, setChefs] = useState([]);
  const [status, setStatus] = useState("active");
  const [menuID, setMenuID] = useState(null);
  const [isAddModal, setIsAddModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [DeleteUserId, setDeleteUserId] = useState(0);
  useEffect(() => {
    // Function to extract menuID from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("Id");
    setMenuID(id);
  }, []);

    //eslint-disable-next-line
  const [menus, setMenus] = useState([]);
  const [menuData, setMenuData] = useState({
    name: "",
    description: "",
    status: "active",
    chefId: "3",
  });

  const fetchMenuData = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7046/api/MenuItem/GetMenuItemById/${id}`
      );
      setMenuData(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const FormatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7046/api/Menu/GetMenus"
        );
        console.log(response.data[0]);
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching Menus:", error);
      }
    };
    const getToken = () => localStorage.getItem("token");
    const token = getToken();

    const fetchChefs = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7046/api/User/GetUsersByRoleId/3",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setChefs(response.data);
      } catch (error) {
        console.error("Error fetching Chefs:", error);
      }
    };
    
    

    fetchMenus();
    fetchChefs();
  }, []);
  const handleDeleteOnEditClick = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = async (id) => {
    await fetchMenuData(id);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    console.log(menuData.id);
    try {
      const response = await axios.put(
        `https://localhost:7046/api/MenuItem?id=${menuData.id}`,
        {
          name: menuData.name,
          ingredients: menuData.ingredients,
          menuId: menuID,
          status: "active",
        }
      );
      setIsEditModalOpen(false);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleDeleteClick = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteUserId(id);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `https://localhost:7046/api/MenuItem?id=${DeleteUserId}`
      );
      setIsDeleteModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting Menu:", error);
    }
  };
  const navigate= useNavigate();
      //eslint-disable-next-line
  const openMenuItems = (id) => {
    navigate(`/Admin?tab=Menu-items&Id=${id}`);
  }

  useEffect(() => {
    // Fetch all menu items
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`https://localhost:7046/api/MenuItem/GetMenuItemsByMenuID/${menuID}`);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, [menuID]);

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
                      <button
                          onClick={() => handleEditClick(menuItem.id)}
                          class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(menuItem.id)}
                          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button></td>
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
        <option value="">Select a Chef</option>
        {chefs.map((chef) => (
          <option key={chef.id} value={chef.id}>
            {chef.name}
          </option>
        ))}
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
            {isDeleteModalOpen && (
        <div
          id="deleteModal"
          tabindex="-1"
          className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center h-full backdrop-blur-lg "
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border-2 border-white">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="deleteModal"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <svg
                class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this user?
              </p>
              <div class="flex justify-center items-center space-x-4">
                <button
                  data-modal-toggle="deleteModal"
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  type="submit"
                  class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
            {isEditModalOpen && (
        <div
          id="updateProductModal"
          tabindex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center h-full backdrop-blur-lg "
        >
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Item
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <form>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>

                    <input
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      type="text"
                      id="name"
                      value={menuData.name}
                      onChange={(e) =>
                        setMenuData({ ...menuData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="status"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Stauts
                    </label>
                    <select
                      id="status"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="" value="active">
                        Active
                      </option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className=" col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900  dark:text-white"
                    >
                      Ingredients
                    </label>
                    <textarea
                      type="text"
                      rows={4}
                      name="description"
                      id="description"
                      value={menuData.ingredients}
                      onChange={(e) =>
                        setMenuData({
                          ...menuData,
                         ingredients: e.target.value,
                        })
                      }
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>

                    <input
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      type="number"
                      id="name"
                      value={menuData.price}
                      onChange={(e) =>
                        setMenuData({ ...menuData, price: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    type="submit"
                    onClick={handleUpdateUser}
                    class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Update Item
                  </button>
                  <button
                    onClick={handleDeleteOnEditClick}
                    type="button"
                    class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Delete
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

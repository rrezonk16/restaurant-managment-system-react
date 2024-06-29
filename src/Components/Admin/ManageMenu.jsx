import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ManageMenu = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [DeleteUserId, setDeleteUserId] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [chef, setChef] = useState('');
  const [chefs, setChefs] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuData, setMenuData] = useState({
    name: "",
    description: "",
    status: "",
    chefId: chef,
  });

  const fetchMenuData = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7046/api/Menu/GetMenu/${id}`
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
    fetchChefs()
    fetchMenus();
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
        `https://localhost:7046/api/Menu/update-menu-by-id/${menuData.id}`,
        {
          name: menuData.name,
          description: menuData.description,
          chefId: 3,
          status: menuData.status,
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
        `https://localhost:7046/api/Menu/delete-menu-by-id/${DeleteUserId}`
      );
      setIsDeleteModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting Menu:", error);
    }
  };
  const navigate= useNavigate();
  const openMenuItems = (id) => {
    navigate(`/Admin?tab=Menu-items&Id=${id}`);
  }

  const handleCreateMenu = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://localhost:7046/api/Menu/AddMenu`,
        {
          name: menuData.name,
          description: menuData.description,
          chefId: chef,
          status: "active",
        }
      );
      setIsEditModalOpen(false);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error adding menu", error);
    }
  };
  
  return (
    <div>
      <section class="bg-gray-800 p-3 sm:p-5 antialiased rounded-2xl">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4">
              <div class="w-full md:w-1/2">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add new menu +
                </button>
              </div>
            </div>
            <div class="overflow-x-auto ">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-4">
                      Name
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Chef
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Created On
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3  flex items-center justify-end"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map((menu) => (
                    <tr

                                          key={menu.id}
                      class="border-b dark:border-gray-700 text-white hover:bg-gray-700 cursor-pointer "
                    >
                      <td class="px-4 py-3">{menu.name}</td>
                      <td class="px-4 py-3">{menu.chefId}</td>
                      <td class="px-4 py-3">{menu.description}</td>
                      <td class="px-4 py-3">{FormatDate(menu.createdAt)}</td>
                      <td class="px-4 py-3">{menu.status}</td>
                      <td class="px-4 py-3 flex items-center justify-end">
                      <button
                         onClick={() => openMenuItems(menu.id)}
                          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => handleEditClick(menu.id)}
                          class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(menu.id)}
                          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
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
                  Update Menu
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
                    onChange={(e) =>
                      setMenuData({ ...menuData, status: e.target.value })
                    }
                    value={menuData.status}

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
                      Description
                    </label>
                    <textarea
                      type="text"
                      rows={4}
                      name="description"
                      id="description"
                      value={menuData.description}
                      onChange={(e) =>
                        setMenuData({
                          ...menuData,
                          description: e.target.value,
                        })
                      }
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    type="submit"
                    onClick={handleUpdateUser}
                    class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Update Menu
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

      {isAddModalOpen && (
        <div
          id="addMenuModa;"
          tabindex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center h-full backdrop-blur-lg "
        >
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Menu
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
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
                  <div className=" col-span-2">
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

                  <div className=" col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900  dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      rows={4}
                      name="description"
                      id="description"
                      value={menuData.description}
                      onChange={(e) =>
                        setMenuData({
                          ...menuData,
                          description: e.target.value,
                        })
                      }
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    type="submit"
                    onClick={handleCreateMenu}
                    class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add Menu
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

export default ManageMenu;

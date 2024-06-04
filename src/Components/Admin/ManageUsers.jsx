import React, { useEffect, useState } from "react";
import axios from "axios";
const ManageUsers = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [DeleteUserId, setDeleteUserId] = useState(0);

  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    status: "active",
    roleId: "1",
  });

  // Function to fetch user data by ID
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7046/api/User/GetUser/${id}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7046/api/User/GetAllUsers"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleDeleteOnEditClick = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = async (id) => {
    await fetchUserData(id);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    console.log(userData);

    try {
      const response = await axios.put(
        `https://localhost:7046/api/User/update-user-by-id/${userData.id}`,
     {
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          password: '1123',
          birthday: '2024-04-23T21:27:57.759Z',
          roleId: 1,
          status: 'active',
          contractDueDate: '2024-04-23T21:27:57.759Z'
        }
      );
      setIsEditModalOpen(false);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      console.log({
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: '1123',
        birthday: '2024-04-23T21:27:57.759Z',
        roleId: 1,
        status: 'active',
        contractDueDate: '2024-04-23T21:27:57.759Z'
      });
    }
    
  };
  const handleDeleteClick = (id) => {
    setIsDeleteModalOpen(true);
    console.log(id);
    setDeleteUserId(id)
  };

  const handleDeleteUser = async () => {
    console.log(userData.id);
    try {
      await axios.delete(`https://localhost:7046/api/User/delete-user-by-id/${DeleteUserId}`);
      setIsDeleteModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <section class="bg-gray-800 p-3 sm:p-5 antialiased rounded-2xl">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
       
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-4">
                      Name
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Surname
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Phone Number
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
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      class="border-b dark:border-gray-700 text-white"
                    >
                      <td class="px-4 py-3">{user.name}</td>
                      <td class="px-4 py-3">{user.surname}</td>
                      <td class="px-4 py-3">{user.email}</td>
                      <td class="px-4 py-3">{user.phoneNumber}</td>
                      <td class="px-4 py-3">{user.status}</td>
                      <td class="px-4 py-3 flex items-center justify-end">
                        <button
                          onClick={() => handleEditClick(user.id)}
                          class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        <button
        onClick={() => handleDeleteClick(user.id)}
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
                  Update User
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
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="surname"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Surname
                    </label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      value={userData.surname}
                      onChange={(e) =>
                        setUserData({ ...userData, surname: e.target.value })
                      }
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      
                    />
                  </div>
                  <div>
                    <label
                      for="phoneNumber"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={(e) =>
                        setUserData({ ...userData, phoneNumber: e.target.value })
                      }
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      
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
                  <div>
                    <label
                      for="role"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="" value="1">
                        User
                      </option>
                      <option value="2">Admin</option>
                      <option value="3">Chef</option>
                    </select>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    type="submit"
                    onClick={handleUpdateUser}
                    class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Update User
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
    </div>
  );
};

export default ManageUsers;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodMenu = () => {
  // State to store the menu data
  const [menus, setMenus] = useState([]);

  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // Make a GET request using Axios
        const response = await axios.get('https://localhost:7046/api/Menu/GetMenus');

        // Set the retrieved data to the state
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    // Call the fetchMenus function
    fetchMenus();
  }, []); // Empty dependency array ensures the effect runs only once on component mount
  useEffect(() => {
    document.title = 'Menu';
  }, []);  
  return (
    <div class="container mx-auto bg-white">
  <h2 class="text-2xl font-bold mb-4">Menus</h2>
  <div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th class="px-4 py-2 bg-gray-200 border">Name</th>
          <th class="px-4 py-2 bg-gray-200 border">Description</th>
          <th class="px-4 py-2 bg-gray-200 border">Items</th>
          <th class="px-4 py-2 bg-gray-200 border">Chef ID</th>
        </tr>
      </thead>
      <tbody>
        {menus.map(menu => (
        <tr key={menu.id}>
          <td class="px-4 py-2 border">{menu.name}</td>
          <td class="px-4 py-2 border">{menu.description}</td>
          <td class="px-4 py-2 border">
            {menu.menuItems !== null ? (
            <ul>
              {menu.menuItems.map(item => (
              <li key={item.id}>
                {item.name} - {item.ingredients}
              </li>
              ))}
            </ul>
            ) : (
            <p>No menu items available</p>
            )}
          </td>
          <td class="px-4 py-2 border">{menu.chefId}</td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default FoodMenu;

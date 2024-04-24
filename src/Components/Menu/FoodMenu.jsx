import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navigation/Navbar';
import Footer from '../Footer/Footer';

const FoodMenu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('https://localhost:7046/api/Menu/GetMenus');
        console.log(response.data);
        setMenus(response.data); // Assuming response.data is an array
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []); 

  useEffect(() => {
    document.title = 'Menu';
  }, []);  

  return (
    <div>
    <Navbar/>
    <div className="container my-32  ">
      <h2 className="text-2xl font-bold mb-4">Menus</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-slate-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 border">ID</th>
              <th className="px-4 py-2 bg-gray-200 border">Name</th>
              <th className="px-4 py-2 bg-gray-200 border">Description</th>
              <th className="px-4 py-2 bg-gray-200 border">Items</th>
              <th className="px-4 py-2 bg-gray-200 border">Chef ID</th>
            </tr>
          </thead>
          <tbody>
            {menus.map(menu => (
              <tr key={menu.id}>
                <td className="px-4 py-2 border">{menu.id}</td>
                <td className="px-4 py-2 border">{menu.name}</td>
                <td className="px-4 py-2 border">{menu.description}</td>
                <td className="px-4 py-2 border">{menu.items}</td>
                <td className="px-4 py-2 border">{menu.chefId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default FoodMenu;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [tableId, setTableId] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:7046/api/Order/GetOrders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7046/api/Order/delete-order-by-id/${id}`);
      console.log(response);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  

  const editOrder = (order) => {
    setEditingOrder(order);
    setStatus(order.status);
    setTableId(order.tableId);
  };
  
  const navigate = useNavigate()
  const openBill = (order) => {
   navigate(`/order-bill?id=${order}`)
  };
  const updateOrder = async () => {
    try {
      const updatedOrder = { ...editingOrder, status, tableId };
      await axios.put(`https://localhost:7046/api/Order/update-order-by-id/${editingOrder.id}`, updatedOrder);
      setOrders(orders.map(order => (order.id === editingOrder.id ? updatedOrder : order)));
      setEditingOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between rounded-3xl">
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Manage Orders</h2>
        {editingOrder ? (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Edit Order</h3>
            <div>
              <label>Status:</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded"
              />
            </div>
            <div>
              <label>Table ID:</label>
              <input
                type="number"
                value={tableId}
                onChange={(e) => setTableId(parseInt(e.target.value))}
                className="bg-gray-800 text-white p-2 rounded"
              />
            </div>
            <button onClick={updateOrder} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
              Save
            </button>
            <button onClick={() => setEditingOrder(null)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <ul className="list-none p-0">
              {orders.map(order => (
                <li key={order.id} className="bg-gray-800 mb-2 p-4 rounded flex justify-between items-center">
                  <div>
                    <p>Order ID: {order.id}</p>
                    <p>Status: {order.status}</p>
                    <p>Table ID: {order.tableId}</p>
                  </div>
                  <div>
                  <button onClick={() => openBill(order.id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Get Bill
                    </button>
                    <button onClick={() => editOrder(order)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => deleteOrder(order.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;

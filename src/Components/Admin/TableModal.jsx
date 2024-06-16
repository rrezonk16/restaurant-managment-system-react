import React, { useState, useEffect } from 'react';

const TableModal = ({ isOpen, onClose, onSave, table, restaurantID }) => {
  const [formData, setFormData] = useState({
    restaurantID: restaurantID || '', // Use restaurantID from props
    status: table ? table.status : '',
    numberOfSeats: table ? table.numberOfSeats : '',
  });

  useEffect(() => {
    setFormData({
      restaurantID: restaurantID || '',
      status: table ? table.status : '',
      numberOfSeats: table ? table.numberOfSeats : '',
    });
  }, [table, restaurantID]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-md w-1/3">
          <h2 className="text-xl font-bold mb-4">{table ? 'Edit Table' : 'Add Table'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Status:</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Number of Seats:</label>
              <input
                type="number"
                name="numberOfSeats"
                value={formData.numberOfSeats}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                {table ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TableModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import tableImage from "../Images/table.png"; // Adjust the path to where your image is stored
import { useLocation } from "react-router-dom";
import TableModal from "./TableModal"; // Import the TableModal component

const ManageTables = () => {
  const [tables, setTables] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const branchId = searchParams.get("id");

  useEffect(() => {
    if (branchId) {
      fetchTables(branchId);
    }
  }, [branchId]);

  const fetchTables = (branchId) => {
    axios
      .get(`https://localhost:7046/api/Table/GetTablesByRestaurantId/${branchId}`)
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tables:", error);
      });
  };

  const handleAddTable = () => {
    setEditingTable(null);
    setModalOpen(true);
  };

  const handleEditTable = (table) => {
    setEditingTable(table);
    setModalOpen(true);
  };

  const handleDeleteTable = (id) => {
    axios
      .delete(`https://localhost:7046/api/Table/DeleteTable/${id}`)
      .then(() => {
        fetchTables(branchId);
      })
      .catch((error) => {
        console.error("Error deleting table:", error);
      });
  };

  const handleSaveTable = (tableData) => {
    if (editingTable) {
      axios
        .put(`https://localhost:7046/api/Table/UpdateTable/${editingTable.tableID}`, tableData)
        .then(() => {
          fetchTables(branchId);
          setModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating table:", error);
        });
    } else {
      axios
        .post(`https://localhost:7046/api/Table/AddTable`, tableData)
        .then(() => {
          fetchTables(branchId);
          setModalOpen(false);
        })
        .catch((error) => {
          console.error("Error adding table:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-xl font-bold mb-4">Manage Tables for Branch {branchId}</h2>
      <button
        onClick={handleAddTable}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Add Table
      </button>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((table) => (
            <div
              key={table.tableID}
              className="border p-4 rounded shadow-md flex flex-col items-center"
              onClick={() => handleEditTable(table)}
            >
              <img
                src={tableImage}
                alt="Table"
                className="w-32 h-32 object-cover mb-2"
              />
              <div className="text-center">
                <p>
                  <strong>Table ID:</strong> {table.tableID}
                </p>
                <p>
                  <strong>Status:</strong> {table.status}
                </p>
                <p>
                  <strong>Seats:</strong> {table.numberOfSeats}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTable(table.tableID);
                  }}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TableModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTable}
        table={editingTable}
        restaurantID={branchId} // Pass the restaurant ID to the modal
      />
    </div>
  );
};

export default ManageTables;

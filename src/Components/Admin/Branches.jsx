import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ManageTables from "./ManageTables";
import AddBranchModal from "./AddBranchModal";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7046/api/Restaurant/GetAllRestaurants"
        );
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    if (branchId) {
      navigate(`/Admin?tab=Branches&id=${branchId}`);
    }
  };

  const handleAddBranchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBranchAdded = () => {
    // Logic to refresh the branch list if necessary
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Select Branch</h1>
      <select
        value={selectedBranch}
        onChange={handleBranchChange}
        className="w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select a branch</option>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddBranchClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Branch
      </button>
      <AddBranchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBranchAdded={handleBranchAdded}
      />
      {selectedBranch && <ManageTables branchId={selectedBranch} />}
    </div>
  );
};

export default Branches;

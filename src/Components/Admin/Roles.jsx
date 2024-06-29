import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [selectedPages, setSelectedPages] = useState([]);

  const pageMappings = [
    { id: 1, name: 'Users' },
    { id: 2, name: 'Sales' },
    { id: 3, name: 'Reservations' },
    { id: 4, name: 'Orders' },
    { id: 5, name: 'Menu' },
    { id: 6, name: 'Branches' },
    { id: 7, name: 'Employees' },
    { id: 8, name: 'Roles' },
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:7046/api/Role/GetAllRoles');
      const rolesWithParsedPages = response.data.map(role => ({
        ...role,
        allowedPages: JSON.parse(role.allowedPages)
      }));
      setRoles(rolesWithParsedPages);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const addRole = async () => {
    try {
      const response = await axios.post('https://localhost:7046/api/Role/AddRole', {
        name: newRole,
        status: "active",
        allowedPages: JSON.stringify(selectedPages)
      });
      if (response.status === 200) {
        setNewRole("");
        setSelectedPages([]);
        fetchRoles();
      }
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const deleteRole = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7046/api/Role/delete-role-by-id/${id}`);
      if (response.status === 200) {
        setRoles(roles.filter(role => role.id !== id));
      }
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const updateRolePages = async (id, updatedPages, roleName) => {
    try {
      const response = await axios.put(`https://localhost:7046/api/Role/update-role-by-id/${id}`, {
        allowedPages: JSON.stringify(updatedPages),
        status: "active",
        name: roleName,
      });
      if (response.status === 200) {
        setRoles(roles.map(role => {
          if (role.id === id) {
            return { ...role, allowedPages: updatedPages };
          }
          return role;
        }));
      }
    } catch (error) {
      console.error('Error updating role pages:', error);
    }
  };

  const handleCheckboxChange = (roleId, pageId) => {
    const roleToUpdate = roles.find(role => role.id === roleId);
    if (!roleToUpdate) return;

    const updatedPages = roleToUpdate.allowedPages.includes(pageId)
      ? roleToUpdate.allowedPages.filter(id => id !== pageId)
      : [...roleToUpdate.allowedPages, pageId];

    updateRolePages(roleId, updatedPages, roleToUpdate.name);
  };

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Roles Management</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="New Role"
          className="border p-2 mr-2"
        />
        <button onClick={addRole} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Role
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Pages Allowed</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {roles.map(role => (
            <tr key={role.id}>
              <td className="py-3 px-6">{role.name}</td>
              <td className="py-3 px-6">{role.status}</td>
              <td className="py-3 px-6">
                {role.allowedPages && role.allowedPages.map(pageId => (
                  <span key={pageId} className="mr-2">{pageMappings.find(page => page.id === pageId)?.name}</span>
                ))}
                <div className="mt-2">
                  {pageMappings.map(page => (
                    <label key={page.id} className="inline-flex items-center mx-2">
                      <input
                        type="checkbox"
                        checked={role.allowedPages && role.allowedPages.includes(page.id)}
                        onChange={() => handleCheckboxChange(role.id, page.id)}
                        className="form-checkbox text-indigo-500 h-5 w-5"
                      />
                      <span className="text-gray-700">{page.name}</span>
                    </label>
                  ))}
                </div>
              </td>
              <td className="py-3 px-6">
                <button onClick={() => deleteRole(role.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Delete
                </button>
        
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;

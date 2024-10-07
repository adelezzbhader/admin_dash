// src/components/Users.js
import React, { useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', image: 'https://via.placeholder.com/50' },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUserData, setNewUserData] = useState({ name: '', email: '' });
  const [addingUser, setAddingUser] = useState(false);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUserData({ name: user.name, email: user.email });
  };

  const handleSave = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...newUserData } : user)));
    setEditingUser(null);
  };

  const handleAddUser = () => {
    if (newUserData.name && newUserData.email) {
      const newUser = {
        id: users.length + 1,
        name: newUserData.name,
        email: newUserData.email,
        image: 'https://via.placeholder.com/50', // صورة افتراضية للمستخدم الجديد
      };
      setUsers([...users, newUser]);
      setNewUserData({ name: '', email: '' });
      setAddingUser(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      
      {/* Add User Button */}
      <button
        onClick={() => setAddingUser(!addingUser)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        {addingUser ? 'Cancel' : 'Add User'}
      </button>

      {/* Add User Form */}
      {addingUser && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newUserData.name}
            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
            className="border rounded p-1 mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUserData.email}
            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
            className="border rounded p-1 mr-2"
          />
          <button onClick={handleAddUser} className="bg-blue-500 text-white px-3 py-1 rounded">
            Add
          </button>
        </div>
      )}

      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">
                <img src={user.image} alt={user.name} className="rounded-full" />
              </td>
              <td className="py-3 px-6 text-left">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    className="border rounded p-1"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    className="border rounded p-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {editingUser?.id === user.id ? (
                  <button onClick={() => handleSave(user.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=anime-${Math.random()}`,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleEdit = () => {
    setEditMode(!editMode);
    setError(''); // Clear any error message when editing
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Simulate update logic
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
    });
    setEditMode(false);
    setFormData({ name: '', email: '', username: '', password: '', confirmPassword: '' });
  };

  const handleRemove = () => {
    alert('Account removed');
    // Logic for removing the account
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-200 bg-opacity-50 shadow-lg rounded-xl text-white backdrop-blur-sm">
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white">
            <span className="text-xs">✎</span>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-black">{user.name}</h2> {/* Changed color to black */}
        <p className="text-xl font-light text-black">{user.email}</p> {/* Changed color to black */}
      </div>

      {editMode ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black">Full Name</label> {/* Changed color to black */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-4 rounded-lg bg-gray-50 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Email</label> {/* Changed color to black */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-4 rounded-lg bg-gray-50 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Username</label> {/* Changed color to black */}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-4 rounded-lg bg-gray-50 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Password</label> {/* Changed color to black */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-4 rounded-lg bg-gray-50 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Confirm Password</label> {/* Changed color to black */}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full p-4 rounded-lg bg-gray-50 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-6">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Update Profile
            </button>
            <button
              onClick={handleEdit}
              className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleEdit}
            className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
          >
            Edit Profile
          </button>

          <div className="text-center space-y-2">
            <button
              onClick={handleRemove}
              className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
            >
              Remove Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

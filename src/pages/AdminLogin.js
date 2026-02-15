import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';
import { usePlants } from '../context/PlantsContext';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { adminLogin, isAdmin, showToast } = usePlants();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin-panel');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (adminLogin(password)) {
      showToast('Login successful! Welcome Admin 🎉', 'success');
      navigate('/admin-panel');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-4xl text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-green-100">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              {error && (
                <p className="mt-2 text-red-500 text-sm font-medium animate-fadeIn">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Login
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 text-center">
          <p className="text-gray-600">
            Admin panel allows you to manage plants, add new ones, edit existing plants, and delete plants from the catalog.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
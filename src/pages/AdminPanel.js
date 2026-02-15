import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaTimes, FaImage } from 'react-icons/fa';
import { usePlants } from '../context/PlantsContext';
import { formatPrice, isValidImageUrl } from '../utils/helpers';

const AdminPanel = () => {
  const { plants, addPlant, updatePlant, deletePlant, adminLogout, showToast } = usePlants();
  const navigate = useNavigate();
  
  const [showForm, setShowForm] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Indoor',
    stock: '',
    careLevel: 'Easy',
    images: [''],
    benefits: [''],
    rating: '4.5',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Indoor',
      stock: '',
      careLevel: 'Easy',
      images: [''],
      benefits: [''],
      rating: '4.5',
    });
    setEditingPlant(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addBenefitField = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const removeBenefitField = (index) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: newBenefits });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate images
    const validImages = formData.images.filter(img => img && isValidImageUrl(img));
    if (validImages.length === 0) {
      showToast('Please add at least one valid image URL', 'error');
      return;
    }

    // Validate benefits
    const validBenefits = formData.benefits.filter(b => b.trim());
    if (validBenefits.length === 0) {
      showToast('Please add at least one benefit', 'error');
      return;
    }

    const plantData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      careLevel: formData.careLevel,
      images: validImages,
      benefits: validBenefits,
      rating: parseFloat(formData.rating),
    };

    if (editingPlant) {
      updatePlant(editingPlant.id, plantData);
      showToast('Plant updated successfully! ✅', 'success');
    } else {
      addPlant(plantData);
      showToast('Plant added successfully! 🌱', 'success');
    }

    resetForm();
  };

  const handleEdit = (plant) => {
    setFormData({
      name: plant.name,
      description: plant.description,
      price: plant.price.toString(),
      category: plant.category,
      stock: plant.stock.toString(),
      careLevel: plant.careLevel,
      images: plant.images,
      benefits: plant.benefits,
      rating: plant.rating.toString(),
    });
    setEditingPlant(plant);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deletePlant(id);
    showToast('Plant deleted successfully! 🗑️', 'success');
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    adminLogout();
    showToast('Logged out successfully! 👋', 'success');
    navigate('/');
  };

  // Dashboard Stats
  const totalPlants = plants.length;
  const totalStock = plants.reduce((sum, p) => sum + p.stock, 0);
  const avgRating = (plants.reduce((sum, p) => sum + p.rating, 0) / plants.length).toFixed(1);
  const categories = [...new Set(plants.map(p => p.category))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Admin Panel 🛠️
            </h1>
            <p className="text-gray-600">Manage your plant inventory</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-all flex items-center space-x-2"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
            <div className="text-3xl font-bold text-primary mb-2">{totalPlants}</div>
            <div className="text-gray-600">Total Plants</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <div className="text-3xl font-bold text-primary mb-2">{totalStock}</div>
            <div className="text-gray-600">Total Stock</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl font-bold text-primary mb-2">{avgRating}⭐</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn" style={{animationDelay: '0.3s'}}>
            <div className="text-3xl font-bold text-primary mb-2">{categories}</div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>

        {/* Add Plant Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 animate-fadeIn"
          >
            <FaPlus />
            <span>Add New Plant</span>
          </button>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingPlant ? 'Edit Plant' : 'Add New Plant'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-red-500 transition-all"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Plant Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Plant Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                    placeholder="e.g., Tulsi Plant"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                    placeholder="299"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Succulents">Succulents</option>
                    <option value="Herbs">Herbs</option>
                  </select>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                    placeholder="10"
                  />
                </div>

                {/* Care Level */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Care Level *
                  </label>
                  <select
                    name="careLevel"
                    value={formData.careLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Rating (0-5) *
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                    placeholder="4.5"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all resize-none"
                  placeholder="Enter plant description..."
                ></textarea>
              </div>

              {/* Images */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Image URLs *
                </label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex space-x-2 mb-3">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="bg-red-500 text-white px-4 rounded-lg hover:bg-red-600 transition-all"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-primary hover:text-primary-dark font-medium flex items-center space-x-2"
                >
                  <FaImage />
                  <span>Add Another Image</span>
                </button>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Benefits *
                </label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                      placeholder="e.g., Air purification"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBenefitField(index)}
                        className="bg-red-500 text-white px-4 rounded-lg hover:bg-red-600 transition-all"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBenefitField}
                  className="text-primary hover:text-primary-dark font-medium flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Add Another Benefit</span>
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  {editingPlant ? 'Update Plant' : 'Add Plant'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Plants List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            All Plants ({plants.length})
          </h2>
          
          {plants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <p className="text-gray-600">No plants yet. Add your first plant!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-primary transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={plant.images[0]}
                      alt={plant.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{plant.name}</h3>
                      <p className="text-gray-600">
                        {formatPrice(plant.price)} • {plant.category} • Stock: {plant.stock}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(plant)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center space-x-2"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(plant.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center space-x-2"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 animate-scaleIn">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this plant? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

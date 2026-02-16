import React, { createContext, useState, useContext, useEffect } from 'react';
import initialPlants from '../data/plants.json';

const PlantsContext = createContext();

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error('usePlants must be used within PlantsProvider');
  }
  return context;
};

export const PlantsProvider = ({ children }) => {
  // Initialize plants from localStorage or use initial data
  const [plants, setPlants] = useState(() => {
    const savedPlants = localStorage.getItem('plants');
    return savedPlants ? JSON.parse(savedPlants) : initialPlants;
  });

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Save plants to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  // Add a new plant
  const addPlant = (plantData) => {
    const newPlant = {
      ...plantData,
      id: Date.now().toString(), // Generate unique ID
    };
    setPlants([...plants, newPlant]);
    showToast('Plant added successfully! 🌱', 'success');
    return newPlant;
  };

  // Update an existing plant
  const updatePlant = (id, updatedData) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, ...updatedData } : plant
    ));
    showToast('Plant updated successfully! ✅', 'success');
  };

  // Delete a plant
  const deletePlant = (id) => {
    setPlants(plants.filter(plant => plant.id !== id));
    showToast('Plant deleted successfully! 🗑️', 'success');
  };

  // Admin login
  const adminLogin = (password) => {
    if (password === 'Chutki@1234') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  // Admin logout
  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Show toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const value = {
    plants,
    loading: false,
    addPlant,
    updatePlant,
    deletePlant,
    isAdmin,
    adminLogin,
    adminLogout,
    showToast,
    toast,
  };

  return (
    <PlantsContext.Provider value={value}>
      {children}
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </PlantsContext.Provider>
  );
};
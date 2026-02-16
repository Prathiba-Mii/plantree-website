import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { fetchPlants, addPlant as apiAddPlant, updatePlant as apiUpdatePlant, deletePlant as apiDeletePlant } from '../utils/api';

const PlantsContext = createContext();

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error('usePlants must be used within PlantsProvider');
  }
  return context;
};

export const PlantsProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [toast, setToast] = useState(null);

  // Toast notification function
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Fetch plants from backend on mount
  useEffect(() => {
    const loadPlants = async () => {
      setLoading(true);
      try {
        const data = await fetchPlants();
        setPlants(data);
      } catch (error) {
        console.error('Failed to load plants:', error);
        showToast('Failed to load plants', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadPlants();
  }, [showToast]);

  // Refresh plants function
  const refreshPlants = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPlants();
      setPlants(data);
    } catch (error) {
      console.error('Failed to load plants:', error);
      showToast('Failed to load plants', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Add a new plant
  const addPlant = async (plantData) => {
    try {
      const newPlant = await apiAddPlant(plantData);
      setPlants([...plants, newPlant]);
      showToast('Plant added successfully! 🌱', 'success');
      return newPlant;
    } catch (error) {
      showToast('Failed to add plant', 'error');
      throw error;
    }
  };

  // Update an existing plant
  const updatePlant = async (id, updatedData) => {
    try {
      const updated = await apiUpdatePlant(id, updatedData);
      setPlants(plants.map(plant => 
        (plant._id === id || plant.id === id) ? updated : plant
      ));
      showToast('Plant updated successfully! ✅', 'success');
    } catch (error) {
      showToast('Failed to update plant', 'error');
      throw error;
    }
  };

  // Delete a plant
  const deletePlant = async (id) => {
    try {
      await apiDeletePlant(id);
      setPlants(plants.filter(plant => plant._id !== id && plant.id !== id));
      showToast('Plant deleted successfully! 🗑️', 'success');
    } catch (error) {
      showToast('Failed to delete plant', 'error');
      throw error;
    }
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

  const value = {
    plants,
    loading,
    addPlant,
    updatePlant,
    deletePlant,
    isAdmin,
    adminLogin,
    adminLogout,
    showToast,
    toast,
    refreshPlants,
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
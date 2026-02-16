const API_BASE_URL = 'https://plantree-backend.onrender.com/api';

// Get all plants
export const fetchPlants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/plants`);
    if (!response.ok) throw new Error('Failed to fetch plants');
    const data = await response.json();
    
    // Backend returns { success: true, plants: [...] }
    // We need just the plants array
    return data.plants || [];
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};

// Add new plant
export const addPlant = async (plantData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plantData),
    });
    if (!response.ok) throw new Error('Failed to add plant');
    const data = await response.json();
    
    // Backend returns { success: true, plant: {...} }
    return data.plant || data;
  } catch (error) {
    console.error('Error adding plant:', error);
    throw error;
  }
};

// Update plant
export const updatePlant = async (id, plantData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plantData),
    });
    if (!response.ok) throw new Error('Failed to update plant');
    const data = await response.json();
    
    // Backend returns { success: true, plant: {...} }
    return data.plant || data;
  } catch (error) {
    console.error('Error updating plant:', error);
    throw error;
  }
};

// Delete plant
export const deletePlant = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plants/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete plant');
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error deleting plant:', error);
    throw error;
  }
};
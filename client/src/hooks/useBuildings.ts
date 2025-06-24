import { useState, useEffect } from 'react';
import { apiService, ApiBuilding } from '../services/api';

export const useBuildings = (options?: { onSuccess?: () => void }) => {
  const [buildings, setBuildings] = useState<ApiBuilding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getBuildings();
      setBuildings(data);
    } catch (err) {
      console.error('Failed to fetch buildings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch buildings');
    } finally {
      setLoading(false);
    }
  };

  const addBuilding = async (buildingData: any) => {
    try {
      const newBuilding = await apiService.createBuilding(buildingData);
      setBuildings(prev => [...prev, newBuilding]);
      if (options?.onSuccess) {
        options.onSuccess();
      }
      return newBuilding;
    } catch (err) {
      console.error('Failed to create building:', err);
      throw err;
    }
  };

  const updateBuilding = async (id: number, buildingData: any) => {
    try {
      await apiService.updateBuilding(id, buildingData);
      setBuildings(prev => prev.map(building => 
        building.buildingId === id 
          ? { ...building, ...buildingData }
          : building
      ));
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (err) {
      console.error('Failed to update building:', err);
      throw err;
    }
  };

  const deleteBuilding = async (id: number) => {
    try {
      await apiService.deleteBuilding(id);
      setBuildings(prev => prev.filter(building => building.buildingId !== id));
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (err) {
      console.error('Failed to delete building:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  return { 
    buildings, 
    loading, 
    error,
    addBuilding, 
    updateBuilding, 
    deleteBuilding,
    refetch: fetchBuildings
  };
};
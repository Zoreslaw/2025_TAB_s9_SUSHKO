import { useState, useEffect } from 'react';
import { apiService, ApiApartment } from '../services/api';

export const useApartments = (options?: { onSuccess?: () => void }) => {
  const [apartments, setApartments] = useState<ApiApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getApartments();
      setApartments(data);
    } catch (err) {
      console.error('Failed to fetch apartments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch apartments');
    } finally {
      setLoading(false);
    }
  };

  const addApartment = async (apartmentData: any) => {
    try {
      const newApartment = await apiService.createApartment(apartmentData);
      setApartments(prev => [...prev, newApartment]);
      if (options?.onSuccess) {
        options.onSuccess();
      }
      return newApartment;
    } catch (err) {
      console.error('Failed to create apartment:', err);
      throw err;
    }
  };

  const updateApartment = async (id: number, apartmentData: any) => {
    try {
      await apiService.updateApartment(id, apartmentData);
      setApartments(prev => prev.map(apartment => 
        apartment.apartmentId === id 
          ? { ...apartment, ...apartmentData }
          : apartment
      ));
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (err) {
      console.error('Failed to update apartment:', err);
      throw err;
    }
  };

  const deleteApartment = async (id: number) => {
    try {
      await apiService.deleteApartment(id);
      setApartments(prev => prev.filter(apartment => apartment.apartmentId !== id));
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (err) {
      console.error('Failed to delete apartment:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return { 
    apartments, 
    loading, 
    error,
    addApartment, 
    updateApartment, 
    deleteApartment,
    refetch: fetchApartments
  };
};
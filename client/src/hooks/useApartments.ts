import { useState } from 'react';
import { Apartment, ApartmentTenant } from '../types/Apartment';
import { UserStatus } from '../types/User';

export const useApartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([
    {
      id: 1,
      buildingId: 1,
      number: "101",
      tenants: [
        { tenantId: "A123", name: "Jan Kowalski", status: UserStatus.ACTIVE }
      ],
      moveInDate: "2025-01-01"
    },
  ]);
  
  const [nextId, setNextId] = useState(8);

  const addApartment = (apartment: any) => {
    setApartments(prev => [...prev, { ...apartment, id: nextId }]);
    setNextId(id => id + 1);
  };

  const updateApartment = (id: number, updated: any) => {
    setApartments(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteApartment = (id: number) => {
    setApartments(prev => prev.filter(a => a.id !== id));
  };

  return { apartments, addApartment, updateApartment, deleteApartment };
};
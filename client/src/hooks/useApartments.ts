import { useState } from 'react';

export const useApartments = () => {
  const [apartments, setApartments] = useState([
    { id: 1, buildingId: 1, number: "101", tenant: "Jan Kowalski", tenantId: "A123", date: "2025-01-01" },
    { id: 2, buildingId: 1, number: "102", tenant: "Anna Nowak", tenantId: "B456", date: "2025-02-15" },
    { id: 3, buildingId: 3, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
    { id: 4, buildingId: 3, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
    { id: 5, buildingId: 4, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
    { id: 6, buildingId: 2, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
    { id: 7, buildingId: 3, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
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
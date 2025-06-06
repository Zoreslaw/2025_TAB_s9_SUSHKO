import { useState } from 'react';

export const useBuildings = () => {
  const [buildings, setBuildings] = useState([
    { id: 1, address: "Lipowa 12", flats: 100 },
    { id: 2, address: "Kwiatowa 22", flats: 22 },
    { id: 3, address: "Lipowa 13", flats: 33 },
    { id: 4, address: "Lipowa 13", flats: 33 },
    { id: 5, address: "Lipowa 13", flats: 33 },
    { id: 6, address: "Lipowa 13", flats: 33 },
    { id: 7, address: "Lipowa 13", flats: 33 },
  ]);

  const [nextId, setNextId] = useState(8);

  const addBuilding = (building: any) => {
    setBuildings(prev => [...prev, { ...building, id: nextId }]);
    setNextId(id => id + 1);
  };

  const updateBuilding = (id: number, updated: any) => {
    setBuildings(prev => prev.map(b => (b.id === id ? { ...b, ...updated } : b)));
  };

  const deleteBuilding = (id: number) => {
    setBuildings(prev => prev.filter(b => b.id !== id));
  };

  return { buildings, addBuilding, updateBuilding, deleteBuilding };
};
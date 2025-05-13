import { useState, useMemo, useEffect } from 'react';

export type UserRow = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  address?: string | null;
  apartmentNumber?: number | null;
  moveInDate?: Date | null;
  moveOutDate?: Date | null;
};

// Random mock data
const mockRows: UserRow[] = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', role: 'Administrator', status: 'Aktywny', address: null, apartmentNumber: null, moveInDate: null, moveOutDate: null },
  { id: 2, firstName: 'Adam', lastName: 'Kowalski', role: 'Menadżer', status: 'Aktywny', address: null, apartmentNumber: null, moveInDate: null, moveOutDate: null },
  { id: 3, firstName: 'Anna', lastName: 'Nowak', role: 'Mieszkaniec', status: 'Nieaktywny', address: 'Jasnogórska 4', apartmentNumber: 2, moveInDate: new Date('2020-08-01'), moveOutDate: new Date('2024-02-22') },
  { id: 4, firstName: 'Marek', lastName: 'Szymański', role: 'Menadżer', status: 'Aktywny', address: null, apartmentNumber: null, moveInDate: null, moveOutDate: null },
  { id: 5, firstName: 'Michał', lastName: 'Wiśniewski', role: 'Najemca', status: 'Aktywny', address: 'Wielka 28', apartmentNumber: 5, moveInDate: new Date('2023-01-10') },
  { id: 6, firstName: 'Karolina', lastName: 'Zieliński', role: 'Menadżer', status: 'Aktywny', address: null, apartmentNumber: null, moveInDate: null, moveOutDate: null },
  { id: 7, firstName: 'Paweł', lastName: 'Mazur', role: 'Mieszkaniec', status: 'Nieaktywny', address: 'Zielona 9', apartmentNumber: 12, moveInDate: new Date('2018-03-10'), moveOutDate: new Date('2022-07-30') },
  { id: 8, firstName: 'Tomasz', lastName: 'Jankowski', role: 'Najemca', status: 'Aktywny', address: 'Lwowska 13', apartmentNumber: 9, moveInDate: new Date('2022-07-15'), moveOutDate: new Date('2031-09-20') },
];

// Key for local storage
const STORAGE_KEY = 'users';

export function useUserTable() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<UserRow[]>([]);

  // localStorage data initialization
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored, (key, value) => {
        // Convert string to date
        if (key.toLowerCase().includes('date') && value) return new Date(value);
        return value;
      });
      setRows(parsed);
      } catch {
        console.error('localStorage data parse error');
        setRows(mockRows);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRows));
      }
      
    } else {
      setRows(mockRows);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRows));
    }
  }, []);


  // useEffect(() => {
  //   // Get data from DB here
  //   setRows(mockRows);
  // }, []);

  const filteredRows = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((val) =>
        val?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, rows]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return {
    search,
    filteredRows,
    handleSearchChange,
  };
}

import { useState, useMemo, useEffect } from 'react';

export type UserRow = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  adress?: string | null;
  apartementNumber?: number | null;
  moveinDate?: Date | null;
  moveoutDate?: Date | null;
};

// Random mock data
const mockRows: UserRow[] = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', role: 'Administrator', status: 'Aktywny', adress: 'Kwiatowa 12', apartementNumber: 23, moveinDate: new Date('2022-03-22'), moveoutDate: new Date('2044-12-11') },
  { id: 2, firstName: 'Adam', lastName: 'Kowalski', role: 'Menadżer', status: 'Aktywny', adress: null, apartementNumber: null, moveinDate: null, moveoutDate: null },
  { id: 3, firstName: 'Anna', lastName: 'Nowak', role: 'Mieszkaniec', status: 'Nieaktywny', adress: 'Jasnogórska 4', apartementNumber: 2, moveinDate: new Date('2020-08-01'), moveoutDate: new Date('2024-02-22') },
  { id: 4, firstName: 'Marek', lastName: 'Szymański', role: 'Menadżer', status: 'Aktywny', adress: null, apartementNumber: null, moveinDate: null, moveoutDate: null },
  { id: 5, firstName: 'Michał', lastName: 'Wiśniewski', role: 'Najemca', status: 'Aktywny', adress: 'Wielka 28', apartementNumber: 5, moveinDate: new Date('2023-01-10') },
  { id: 6, firstName: 'Karolina', lastName: 'Zieliński', role: 'Menadżer', status: 'Aktywny', adress: null, apartementNumber: null, moveinDate: null, moveoutDate: null },
  { id: 7, firstName: 'Paweł', lastName: 'Mazur', role: 'Mieszkaniec', status: 'Nieaktywny', adress: 'Zielona 9', apartementNumber: 12, moveinDate: new Date('2018-03-10'), moveoutDate: new Date('2022-07-30') },
  { id: 8, firstName: 'Tomasz', lastName: 'Jankowski', role: 'Najemca', status: 'Aktywny', adress: 'Lwowska 13', apartementNumber: 9, moveinDate: new Date('2022-07-15'), moveoutDate: new Date('2031-09-20') },
];

export function useUserTable() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<UserRow[]>([]);

  useEffect(() => {
    // Get data from DB here
    setRows(mockRows);
  }, []);

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

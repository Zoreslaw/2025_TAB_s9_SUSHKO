import { useState, useMemo } from 'react';

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

export function useUserTable(initialRows: UserRow[]) {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<UserRow[]>(initialRows);

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

  const addUser = (newUser: UserRow) => {
    setRows(prev => [...prev, newUser]);
  };

  const updateUser = (updatedUser: UserRow) => {
    setRows(prev =>
      prev.map(row => (row.id === updatedUser.id ? updatedUser : row))
    );
  };

  return {
    search,
    filteredRows,
    handleSearchChange,
    addUser,
    updateUser,
  };
}

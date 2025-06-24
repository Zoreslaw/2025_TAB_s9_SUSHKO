import { useState, useMemo, useEffect } from 'react';
import { apiService } from '../services/api';
import { User } from '../types/User';

export type UserRow = {
  userId: number;
  login: string;
  role: string;
  userStatus: string;
  address?: string | null;
  apartmentNumber?: string | null;
  moveInDate?: Date | null;
  moveOutDate?: Date | null;
  avatarUrl?: string;
};

// Convert API user data to UserRow format
const convertUserToRow = (apiUser: any): UserRow => {
  // Get the first resident record if it exists
  const resident = apiUser.residents && apiUser.residents.length > 0 ? apiUser.residents[0] : null;
  
  return {
    userId: apiUser.userId,
    login: apiUser.login,
    role: apiUser.role || 'resident',
    userStatus: apiUser.userStatus || 'active',
    address: resident?.buildingAddress || null,
    apartmentNumber: resident?.apartmentNumber || null,
    moveInDate: resident?.moveinDate ? new Date(resident.moveinDate) : null,
    moveOutDate: resident?.moveoutDate ? new Date(resident.moveoutDate) : null,
    avatarUrl: apiUser.avatarUrl,
  };
};

// Key for local storage
const STORAGE_KEY = 'users';

export function useUserTable() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUsers = await apiService.getUsers();
        
        // Convert API users to UserRow format
        const userRows = apiUsers.map(apiUser => {
          return convertUserToRow(apiUser);
        });
        
        setRows(userRows);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
    loading,
    error,
  };
}

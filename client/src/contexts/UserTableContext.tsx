import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User, UserStatus, UserRoles } from '../types/User';

// Random mock data
const mockRows: User[] = [
  {
    userId: '1',
    login: 'jp321353',
    password: 'bnhbmbnm',
    avatarUrl: '',
    role: UserRoles.TENANT,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-01-01'),
  },
  {
    userId: '2',
    login: 'fj482364',
    password: 'manager123',
    avatarUrl: '',
    role: UserRoles.MANAGER,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-02-15'),
  },
  {
    userId: '3',
    login: 'jk837512',
    password: 'resident123',
    avatarUrl: '',
    role: UserRoles.RESIDENT,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-03-10'),
  },
  {
    userId: '4',
    login: 'vs824305',
    password: 'tenant123',
    avatarUrl: '',
    role: UserRoles.TENANT,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-04-20'),
  },
  {
    userId: '5',
    login: 'dd8362449',
    password: 'blocked123',
    avatarUrl: '',
    role: UserRoles.RESIDENT,
    userStatus: UserStatus.BLOCKED,
    userCreationDate: new Date('2023-05-05'),
  },
];

const STORAGE_KEY = 'users';

type UserTableContextType = {
  search: string;
  filteredRows: User[];
  handleSearchChange: (value: string) => void;
};

const UserTableContext = createContext<UserTableContextType | undefined>(undefined);

export const UserTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<User[]>([]);

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

  return (
    <UserTableContext.Provider value={{ search, filteredRows, handleSearchChange }}>
      {children}
    </UserTableContext.Provider>
  );
};

// UserTable hook
export const useUserTable = () => {
  const context = useContext(UserTableContext);
  if (!context) {
    throw new Error('useUserTable must be used within a UserTableProvider');
  }
  return context;
};

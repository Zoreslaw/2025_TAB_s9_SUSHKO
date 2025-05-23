import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User, UserStatus, UserRoles } from '../types/User';
import { Resident } from '../types/Resident';
import { Tenant } from '../types/Tenant';

// Random mock data
const mockRows: User[] = [
  { userId: '1', login: 'jp321353', password: 'bnhbmbnm', avatarUrl: '', role: UserRoles.TENANT, userStatus: UserStatus.ACTIVE, userCreationDate: new Date('2023-01-01'), firstName: 'Jakies', lastName: 'Imie' } as Tenant,
  { userId: '2', login: 'fj482364', password: 'manager123', avatarUrl: '', role: UserRoles.MANAGER, userStatus: UserStatus.ACTIVE, userCreationDate: new Date('2023-02-15') },
  { userId: '4', login: 'vs824305', password: 'tenant123', avatarUrl: '', role: UserRoles.TENANT, userStatus: UserStatus.ACTIVE, userCreationDate: new Date('2023-04-20'), firstName: 'Inne', lastName: 'Nazwisko' } as Tenant,
  { userId: '6', login: 'kv348192', password: 'Zx9p@32k', avatarUrl: '', role: UserRoles.RESIDENT, userStatus: UserStatus.ACTIVE, userCreationDate: new Date('2023-03-14'), firstName: 'Anna', lastName: 'Nowak', address: 'Jasnogórska 4', apartmentNumber: '2', moveInDate: new Date('2020-08-01'), moveOutDate: new Date('2024-02-22') } as Resident,
  { userId: '7', login: 'hw590732', password: 'Lm5#r81q', avatarUrl: '', role: UserRoles.RESIDENT, userStatus: UserStatus.INACTIVE, userCreationDate: new Date('2022-11-07'), firstName: 'Michał', lastName: 'Wiśniewski', address: 'Wielka 28', apartmentNumber: '5', moveInDate: new Date('2023-01-10'), moveOutDate: null } as Resident,
  { userId: '14', login: 'cp574306', password: 'Yt2!b35j', avatarUrl: '', role: UserRoles.RESIDENT, userStatus: UserStatus.INACTIVE, userCreationDate: new Date('2021-12-10'), firstName: 'Aleksandra', lastName: 'Wójcik', address: 'Lipowa 22', apartmentNumber: '6', moveInDate: new Date('2017-09-15'), moveOutDate: new Date('2023-08-10') } as Resident,
  { userId: '15', login: 'un648935', password: 'Gc4%t53z', avatarUrl: '', role: UserRoles.RESIDENT, userStatus: UserStatus.ACTIVE, userCreationDate: new Date('2023-02-14'), firstName: 'Piotr', lastName: 'Kaczmarek', address: 'Ogrodowa 3', apartmentNumber: '8', moveInDate: new Date('2023-04-04'), moveOutDate: null } as Resident,
  { userId: '16', login: 'rr552958', password: 'bnhbmbnm', avatarUrl: '', role: UserRoles.TENANT, userStatus: UserStatus.ACTIVE, userCreationDate: new Date('2023-01-01'), firstName: 'Grzegorz', lastName: 'Wiśniewski', email: 'random@ran.com' } as Tenant,
  { userId: '17', login: 'hj426364', password: 'manager123', avatarUrl: '', role: UserRoles.TENANT, userStatus: UserStatus.ACTIVE, userCreationDate: new Date('2023-02-15'), firstName: 'Michał', lastName: 'Kaczmarek', } as Tenant,
  { userId: '18', login: 'uu892012', password: 'resident123', avatarUrl: '', role: UserRoles.TENANT, userStatus: UserStatus.ACTIVE, userCreationDate: new Date('2023-03-10'), firstName: 'Jan', lastName: 'Nowak', email: 'some@sddsa.com' } as Tenant
];

type UserTableContextType = {
  search: string;
  filteredRows: User[];
  handleSearchChange: (value: string) => void;
};

const UserTableContext = createContext<UserTableContextType | undefined>(undefined);

export const UserTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<User[]>([]);

  useEffect(() => {
    // Get data from DB here
    setRows(mockRows);
  }, []);

  const filteredRows = useMemo(() => {
    if (!rows) return [];
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

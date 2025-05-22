import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import AdminSidebar from '../components/sidebars/AdminSidebar'
import { UserTableProvider } from '../contexts/UserTableContext';

const App: React.FC = () => {

 
   return (
    <UserTableProvider>
      <Box sx={{ display: 'flex' }}>
        <AdminSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </UserTableProvider>
   );
};

export default App;

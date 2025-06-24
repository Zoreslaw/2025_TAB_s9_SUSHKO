import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ManagerSidebar from '../components/sidebars/ManagerSidebar';

const ManagerPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ManagerSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ManagerPage; 
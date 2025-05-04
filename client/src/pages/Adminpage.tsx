import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import AdminSidebar from '../components/sidebars/AdminSidebar';
//import ObjectPanel from './admin/ObjectPanel';

const AdminPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
       <AdminSidebar />
       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
         <Outlet />
       </Box>
     </Box>
  );
};

export default AdminPage;

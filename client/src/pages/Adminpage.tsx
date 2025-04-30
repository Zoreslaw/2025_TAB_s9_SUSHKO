import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
//import ObjectPanel from './admin/ObjectPanel';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/object');
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <Button variant="contained" color="primary" onClick={handleNavigate}>
        Go to Object Panel
      </Button>
      
    </div>

    
  );
};

export default AdminPage;


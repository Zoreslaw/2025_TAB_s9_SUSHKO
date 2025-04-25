import React from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

interface AdminToggleProps {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const AdminToggle: React.FC<AdminToggleProps> = ({ isAdmin, toggleAdmin }) => {
  return (
    <Tooltip 
      title={isAdmin ? "Switch to User View" : "Switch to Admin View"}
      placement="left"
      TransitionComponent={Zoom}
    >
      <Fab
        color={isAdmin ? "error" : "success"}
        size="medium"
        onClick={toggleAdmin}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        {isAdmin ? <PersonIcon /> : <AdminPanelSettingsIcon />}
      </Fab>
    </Tooltip>
  );
};

export default AdminToggle; 
import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRoles } from '../../types/User';

const UserMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };
  
  const handleLogin = () => {
    handleMenuClose();
    navigate('/login');
  };
  
  const handleNavigate = (path: string) => {
    handleMenuClose();
    navigate(path);
  };
  
  // Get user initials from username or name
  const getUserInitials = (): string => {
    if (!user) return '?';
    
    const username = user.login;
    return username.substring(0, 2).toUpperCase();
  };
  
  // Get role-based avatar color
  const getAvatarColor = (): string => {
    if (!user) return 'gray';
    
    switch (user.role) {
      case UserRoles.ADMIN:
        return '#d32f2f'; // red
      case UserRoles.MANAGER:
        return '#7b1fa2'; // purple
      case UserRoles.RESIDENT:
        return '#1976d2'; // blue
      case UserRoles.TENANT:
        return '#388e3c'; // green
      default:
        return 'gray';
    }
  };

  return (
    <>
      <Tooltip title={isAuthenticated ? `Logged in as ${user?.login} (${user?.role})` : "Not logged in"}>
        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: getAvatarColor(), 
              width: 32, 
              height: 32, 
              fontSize: '1.0rem',
              fontFamily: 'monospace'
            }}
          >
            {isAuthenticated ? getUserInitials() : '?'}
          </Avatar>
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            mt: 1,
            '& .MuiMenuItem-root': {
              py: 1,
            },
          },
        }}
      >
        {isAuthenticated ? (
          <>
            <MenuItem onClick={() => handleNavigate('/profile')}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            
            <MenuItem onClick={() => handleNavigate('/dashboard')}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </MenuItem>
            
            <MenuItem onClick={() => handleNavigate('/settings')}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            
            <Divider />
            
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <LoginIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserMenu; 
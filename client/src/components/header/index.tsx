import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useAuth } from '../../contexts/AuthContext';
import { UserRoles } from '../../types/User';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  const isAdmin = user?.role === UserRoles.ADMIN;

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
          MieszkaMy.pl
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            component={Link} 
            to="/" 
            sx={{ 
              mx: 1, 
              color: location.pathname === '/' ? 'primary.main' : 'inherit',
              fontWeight: location.pathname === '/' ? 'bold' : 'normal'
            }}
          >
            HOME
          </Button>
          
          <Button 
            component={Link} 
            to="/kontakt" 
            sx={{ 
              mx: 1, 
              color: location.pathname === '/kontakt' ? 'primary.main' : 'inherit',
              fontWeight: location.pathname === '/kontakt' ? 'bold' : 'normal'
            }}
          >
            KONTAKT
          </Button>
          
          {isAuthenticated && (
            <Button 
              component={Link} 
              to="/dashboard" 
              sx={{ 
                mx: 1, 
                color: location.pathname === '/dashboard' ? 'primary.main' : 'inherit',
                fontWeight: location.pathname === '/dashboard' ? 'bold' : 'normal'
              }}
            >
              DASHBOARD
            </Button>
          )}
          
          {isAdmin && (
            <Button 
              component={Link} 
              to="/admin" 
              sx={{ 
                mx: 1, 
                color: location.pathname === '/admin' ? 'primary.main' : 'inherit',
                fontWeight: location.pathname === '/admin' ? 'bold' : 'normal'
              }}
            >
              ADMIN PANEL
            </Button>
          )}
          
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

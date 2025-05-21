import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem,
  Button, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRegisterUserForm } from '../../hooks/useRegisterUserForm';

export default function RegisterUserModal() {
  const {
    form,
    errors,
    isResident,
    handleChange,
    handleSetRole,
    handleClose,
    handleSubmit,
  } = useRegisterUserForm();

  const [roleModalOpen, setRoleModalOpen] = useState(false); 
  const [formModalOpen, setFormModalOpen] = useState(false); 

  const openModal = () => setRoleModalOpen(true);
  const handleSelectRole = (role: string) => {
    handleSetRole(role);      
    setRoleModalOpen(false);     
    setFormModalOpen(true); 
  };

  return (
    <>
      <Button variant="contained" onClick={openModal}>Dodaj</Button>

      {/* User type selection modal */}
      <Dialog open={roleModalOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Wybierz rodzaj użytkownika
          <IconButton onClick={handleClose} sx={{ color: 'grey.500' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={() => handleSelectRole('Mieszkaniec')}>Mieszkaniec</Button>
            <Button variant="contained" onClick={() => handleSelectRole('Menadżer')}>Menadżer</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* User registration modal */}
      <Dialog open={formModalOpen} onClose={handleClose} maxWidth={isResident ? 'sm' : 'xs'} fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Zarejestruj użytkownika
          <IconButton onClick={handleClose} sx={{ color: 'grey.500' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              mt: 2,
              display: 'grid',
              gridTemplateColumns: isResident ? '1fr 1fr' : '1fr',
              gap: 2,
            }}
          >
            {isResident && (
            <TextField
              label="Imię"
              value={form.firstName}
              onChange={handleChange('firstName')}
              error={errors.firstName}
              fullWidth
            />
            )}
            {isResident && (
            <TextField
              label="Nazwisko"
              value={form.lastName}
              onChange={handleChange('lastName')}
              error={errors.lastName}
              fullWidth
            />
            )}
            {isResident && (
              <TextField
                label="Adres"
                value={form.address}
                onChange={handleChange('address')}
                error={errors.address}
                fullWidth
              />
            )}
            {isResident && (
              <TextField
                label="Numer mieszkania"
                type="number"
                inputProps={{ min: 0 }}
                value={form.apartmentNumber}
                onChange={handleChange('apartmentNumber')}
                error={errors.apartmentNumber}
                fullWidth
              />
            )}
            {isResident && (
              <TextField
                label="Data wprowadzenia"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.moveInDate}
                onChange={handleChange('moveInDate')}
                error={errors.moveInDate}
                fullWidth
              />
            )}
            <TextField
              select
              label="Status"
              value={form.status}
              onChange={handleChange('status')}
              error={errors.status}
              fullWidth
            >
              <MenuItem value="Aktywny">Aktywny</MenuItem>
              <MenuItem value="Nieaktywny">Nieaktywny</MenuItem>
            </TextField>
            {isResident && (
              <TextField
                label="Data wyprowadzenia"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.moveOutDate}
                onChange={handleChange('moveOutDate')}
                error={errors.moveOutDate}
                fullWidth
              />
            )}
            {isResident && (
            <TextField
              label="Sugerowany login"
              value={form.login}
              onChange={handleChange('login')}
              error={errors.login}
              fullWidth
            />
            )}
            {!isResident && (
            <TextField
              label="Login"
              value={form.login}
              onChange={handleChange('login')}
              error={errors.login}
              fullWidth
            />
            )}
            <Box
              sx={{
                gridColumn: isResident ? 'span 2' : 'span 1',
                display: 'flex',
                justifyContent: 'center',
                mt: 1,
              }}
            >
              <Button variant="contained" onClick={handleSubmit}>Dodaj</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

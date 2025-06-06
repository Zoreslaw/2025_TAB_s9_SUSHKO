import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem,
  Button, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRegisterUserForm } from '../../hooks/useRegisterUserForm';

const ROLES = ['Mieszkaniec', 'Najemca', 'Menadżer'];

export default function RegisterUserModal() {
  const {
    open,
    form,
    isResident,
    errors,
    handleOpen,
    handleClose,
    handleChange,
    handleRoleChange,
    handleSubmit
  } = useRegisterUserForm();

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>Dodaj</Button>
      <Dialog open={open} onClose={handleClose} maxWidth={isResident ? 'sm' : 'xs'} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between' }}>
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
            <TextField
              label="Imię"
              value={form.firstName}
              onChange={handleChange('firstName')}
              error={errors.firstName}
              fullWidth
            />
            {isResident && (
              <TextField
                label="Adres"
                value={form.address}
                onChange={handleChange('address')}
                error={errors.address}
                fullWidth
              />
            )}
            <TextField
              label="Nazwisko"
              value={form.lastName}
              onChange={handleChange('lastName')}
              error={errors.lastName}
              fullWidth
            />
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
            <TextField
              select
              label="Rodzaj konta"
              value={form.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              fullWidth
            >
              {ROLES.map(role => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </TextField>
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
            <TextField
              label="Sugerowany login"
              value={form.login}
              onChange={handleChange('login')}
              error={errors.login}
              fullWidth
            />
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

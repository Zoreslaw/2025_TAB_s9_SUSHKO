import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  Button, Box, IconButton, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEditUserForm } from '../../hooks/useEditUserForm';

export default function EditUserModal({ open, onClose, userData }: {
  open: boolean;
  onClose: () => void;
  userData: any;
}) {
  const { 
    form, 
    errors, 
    isResident, 
    handleChange, 
    handleSubmit, 
  } = useEditUserForm(userData, onClose);

  return (
    <Dialog open={open} onClose={onClose} maxWidth={isResident ? 'sm' : 'xs'} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between' }}>
        Edytuj użytkownika
        <IconButton onClick={onClose}>
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
          <Box
            sx={{
              gridColumn: isResident ? 'span 2' : 'span 1',
              display: 'flex',
              justifyContent: 'center',
              mt: 1,
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>Zapisz zmiany</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

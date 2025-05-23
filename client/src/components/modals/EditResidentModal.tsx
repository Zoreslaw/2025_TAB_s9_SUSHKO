import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  Button, Box, IconButton, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEditResidentForm } from '../../hooks/useEditResidentForm';
import { User, UserStatus } from '../../types/User';
import { Resident } from '../../types/Resident';

export default function EditResidentModal({ open, onClose, userData }: {
  open: boolean;
  onClose: () => void;
  userData: Resident;
}) {
  const { 
    form, 
    errors, 
    handleClose,
    handleChange, 
    handleSubmit, 
  } = useEditResidentForm(userData, onClose);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between' }}>
        Szczegóły użytkownika
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            mt: 2,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
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
          <TextField
            label="Nazwisko"
            value={form.lastName}
            onChange={handleChange('lastName')}
            error={errors.lastName}
            fullWidth
          />
            <TextField
              label="Adres"
              value={form.address}
              onChange={handleChange('address')}
              error={errors.address}
              fullWidth
            />
            <TextField
              label="Numer mieszkania"
              type="number"
              inputProps={{ min: 0 }}
              value={form.apartmentNumber}
              onChange={handleChange('apartmentNumber')}
              error={errors.apartmentNumber}
              fullWidth
            />
            <TextField
              label="Data wprowadzenia"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.moveInDate}
              onChange={handleChange('moveInDate')}
              error={errors.moveInDate}
              fullWidth
            />
          <TextField
            select
            label="Status"
            value={form.userStatus}
            onChange={handleChange('status')}
            error={errors.status}
            fullWidth
          >
              <MenuItem value={UserStatus.ACTIVE}>Aktywny</MenuItem>
              <MenuItem value={UserStatus.INACTIVE}>Nieaktywny</MenuItem>
              <MenuItem value={UserStatus.BLOCKED}>Zablokowany</MenuItem>
          </TextField>
            <TextField
              label="Data wyprowadzenia"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.moveOutDate}
              onChange={handleChange('moveOutDate')}
              error={errors.moveOutDate}
              fullWidth
            />
          <Box
            sx={{
              gridColumn: 'span 2',
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

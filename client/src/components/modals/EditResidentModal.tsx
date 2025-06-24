import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  Button, Box, IconButton, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEditResidentForm } from '../../hooks/useEditResidentForm';
import { User, UserStatus } from '../../types/User';
import { Resident } from '../../types/Resident';

// Helper to format date for input type="date"
function formatDateForInput(date: any) {
  if (!date) return '';
  if (typeof date === 'string') date = new Date(date);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
}

const statusOptions = [
  { value: 'active', label: 'Aktywny' },
  { value: 'inactive', label: 'Nieaktywny' },
  { value: 'blocked', label: 'Zablokowany' },
];

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
            label="Adres"
            value={form.address}
            onChange={handleChange('address')}
            error={errors.address}
            fullWidth
          />
          <TextField
            label="Numer mieszkania"
            type="text"
            value={form.apartmentNumber}
            onChange={handleChange('apartmentNumber')}
            error={errors.apartmentNumber}
            fullWidth
          />
          <TextField
            label="Data wprowadzenia"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formatDateForInput(form.moveInDate)}
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
            {statusOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Data wyprowadzenia"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formatDateForInput(form.moveOutDate)}
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

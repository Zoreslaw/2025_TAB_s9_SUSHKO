import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  Button, Box, IconButton, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const isResidentRole = (role: string) => role === 'Mieszkaniec' || role === 'Najemca';

export default function EditUserModal({ open, onClose, userData }: {
  open: boolean;
  onClose: () => void;
  userData: any;
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartmentNumber: '',
    moveInDate: '',
    moveOutDate: '',
    status: '',
    role: '',
  });

  useEffect(() => {
    if (userData) {
      setForm({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        address: userData.adress || '',
        apartmentNumber: userData.apartementNumber || '',
        moveInDate: userData.moveinDate?.split('T')[0] || '',
        moveOutDate: userData.moveoutDate?.split('T')[0] || '',
        status: userData.status || '',
        role: userData.role || 'Mieszkaniec',
      });
    }
  }, [userData]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'apartmentNumber' ? Math.max(0, parseInt(e.target.value) || 0) : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isResident = isResidentRole(form.role);

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
          <TextField label="Imię" value={form.firstName} onChange={handleChange('firstName')} fullWidth />
          {isResident && <TextField label="Adres" value={form.address} onChange={handleChange('address')} fullWidth />}
          <TextField label="Nazwisko" value={form.lastName} onChange={handleChange('lastName')} fullWidth />
          {isResident && (
            <TextField
              label="Numer mieszkania"
              type="number"
              inputProps={{ min: 0 }}
              value={form.apartmentNumber}
              onChange={handleChange('apartmentNumber')}
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
              fullWidth
            />
          )}
          <TextField
            select
            label="Status"
            value={form.status}
            onChange={handleChange('status')}
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
            <Button variant="contained">Zapisz zmiany</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

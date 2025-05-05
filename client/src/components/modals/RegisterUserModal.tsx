import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem,
  Button, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ROLES = ['Mieszkaniec', 'Najemca', 'Menadżer'];
const isResidentRole = (role: string) => role === 'Mieszkaniec' || role === 'Najemca';

export default function RegisterUserModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartmentNumber: '',
    moveInDate: '',
    moveOutDate: '',
    status: '',
    login: '',
    role: 'Mieszkaniec',
  });
  const [loginManuallyChanged, setLoginManuallyChanged] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({
      firstName: '',
      lastName: '',
      address: '',
      apartmentNumber: '',
      moveInDate: '',
      moveOutDate: '',
      status: '',
      login: '',
      role: 'Mieszkaniec',
    });
    setLoginManuallyChanged(false);
  };

  useEffect(() => {
    const { firstName, lastName} = form;
    if (firstName && lastName && !loginManuallyChanged) {
      const initials = firstName[0]?.toLowerCase() + lastName[0]?.toLowerCase();
      const random = Math.floor(10000 + Math.random() * 90000);
      setForm(prev => ({ ...prev, login: `${initials}${random}` }));
    }
  }, [form.firstName, form.lastName, form.role, loginManuallyChanged]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (field === 'apartmentNumber' && value && parseInt(value) < 0) return;

    setForm(prev => ({ ...prev, [field]: value }));

    if (['firstName', 'lastName'].includes(field)) {
      setLoginManuallyChanged(false);
    }
    if (field === 'login') {
      setLoginManuallyChanged(true);
    }
  };

  const isResident = isResidentRole(form.role);

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
            <TextField
              select
              label="Rodzaj konta"
              value={form.role}
              onChange={(e) => {
                setForm(prev => ({ ...prev, role: e.target.value, login: '' }));
                setLoginManuallyChanged(false);
              }}
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
            <TextField
              label="Sugerowany login"
              value={form.login}
              onChange={handleChange('login')}
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
              <Button variant="contained">Dodaj</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

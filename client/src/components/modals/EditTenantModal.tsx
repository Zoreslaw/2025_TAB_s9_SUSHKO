import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  Button, Box, IconButton, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEditTenantForm } from '../../hooks/useEditTenantForm';
import { User, UserStatus } from '../../types/User';
import { Tenant } from '../../types/Tenant';

export default function EditTenantModal({ open, onClose, userData }: {
  open: boolean;
  onClose: () => void;
  userData: Tenant;
}) {
  const { 
    form, 
    errors, 
    handleClose,
    handleChange, 
    handleSubmit, 
  } = useEditTenantForm(userData, onClose);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>
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
            gridTemplateColumns: '1fr',
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
            label="Email"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
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
          <Box
            sx={{
              gridColumn: 'span 1',
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

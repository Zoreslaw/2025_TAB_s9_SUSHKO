import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  Button, Box, IconButton, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEditManagerForm } from '../../hooks/useEditManagerForm';
import { User, UserStatus } from '../../types/User';

export default function EditManagerModal({ open, onClose, userData }: {
  open: boolean;
  onClose: () => void;
  userData: User;
}) {
  const { 
    form, 
    errors, 
    handleChange, 
    handleSubmit, 
  } = useEditManagerForm(userData, onClose);

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'xs'} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between' }}>
        Szczegóły użytkownika
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
            gridTemplateColumns: '1fr',
            gap: 2,
          }}
        >
          <TextField
            select
            label="Status"
            value={form.userStatus}
            onChange={handleChange}
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

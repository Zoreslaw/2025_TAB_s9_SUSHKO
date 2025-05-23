import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem,
  Button, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRegisterTenantForm } from '../../hooks/useRegisterTenantForm';

export default function RegisterTenantModal({ open }: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    form,
    errors,
    handleChange,
    handleClose,
    handleSubmit,
  } = useRegisterTenantForm();

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Zarejestruj najemcę
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
              value={form.status}
              onChange={handleChange('status')}
              error={errors.status}
              fullWidth
            >
              <MenuItem value="Aktywny">Aktywny</MenuItem>
              <MenuItem value="Nieaktywny">Nieaktywny</MenuItem>
              <MenuItem value="Zablokowany">Zablokowany</MenuItem>
            </TextField>
            <TextField
              label="Sugerowany login"
              value={form.login}
              onChange={handleChange('login')}
              error={errors.login}
              fullWidth
            />
            <Box
              sx={{
                gridColumn: 'span 1',
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

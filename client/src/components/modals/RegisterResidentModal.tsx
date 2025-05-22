import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem,
  Button, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRegisterResidentForm } from '../../hooks/useRegisterResidentForm';

export default function RegisterResidentModal({ open }: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    form,
    errors,
    handleChange,
    handleClose,
    handleSubmit,
  } = useRegisterResidentForm();

  return (
    <>

      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Zarejestruj mieszkańca
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
              value={form.status}
              onChange={handleChange('status')}
              error={errors.status}
              fullWidth
            >
              <MenuItem value="Aktywny">Aktywny</MenuItem>
              <MenuItem value="Nieaktywny">Nieaktywny</MenuItem>
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
            <TextField
              label="Sugerowany login"
              value={form.login}
              onChange={handleChange('login')}
              error={errors.login}
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
              <Button variant="contained" onClick={handleSubmit}>Dodaj</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem,
  Button, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRegisterManagerForm } from '../../hooks/useRegisterManagerForm';

export default function RegisterManagerModal({ open }: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    form,
    errors,
    handleChange,
    handleClose,
    handleSubmit,
  } = useRegisterManagerForm();

  return (
    <>

      <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Zarejestruj menadżera
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
              select
              label="Status"
              onChange={handleChange('status')}
              value={form.status}
              error={errors.status}
              fullWidth
            >
              <MenuItem value="Aktywny">Aktywny</MenuItem>
              <MenuItem value="Nieaktywny">Nieaktywny</MenuItem>
            </TextField>
            <TextField
              label="Login"
              value={form.login}
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

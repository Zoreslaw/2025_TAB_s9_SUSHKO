import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem,
  Button, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRegisterManagerForm } from '../../hooks/useRegisterManagerForm';
import RegistrationSuccessModal from './RegistrationSuccessModal';

export default function RegisterManagerModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    form,
    errors,
    showSuccessModal,
    generatedPassword,
    handleChange,
    handleClose,
    handleSuccessModalClose,
    handleSubmit,
  } = useRegisterManagerForm({
    onSuccess: () => {
      handleClose();
      onClose();
    }
  });

  // Helper to close modal from UI (button, dialog X, etc)
  const closeModal = () => {
    handleClose();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={closeModal} maxWidth={'sm'} fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Zarejestruj menadżera
          <IconButton onClick={closeModal} sx={{ color: 'grey.500' }}>
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
              select
              label="Status"
              onChange={handleChange('status')}
              value={form.status}
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

      {/* Success Modal */}
      <RegistrationSuccessModal
        open={showSuccessModal}
        onClose={handleSuccessModalClose}
        login={form.login}
        password={generatedPassword}
      />
    </>
  );
}

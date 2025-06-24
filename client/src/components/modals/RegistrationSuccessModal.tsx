import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  open: boolean;
  onClose: () => void;
  login: string;
  password: string;
}

const RegistrationSuccessModal: React.FC<Props> = ({ open, onClose, login, password }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CheckCircleIcon color="success" />
      Rejestracja zakończona pomyślnie
    </DialogTitle>
    <DialogContent>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Użytkownik został pomyślnie zarejestrowany. Poniżej znajdują się dane logowania:
        </Typography>
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Login"
            value={login}
            fullWidth
            InputProps={{ readOnly: true }}
            variant="outlined"
          />
          <TextField
            label="Hasło"
            value={password}
            fullWidth
            InputProps={{ readOnly: true }}
            variant="outlined"
            type="text"
          />
        </Box>
        <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
          ⚠️ Zapisz te dane! Hasło nie będzie już wyświetlane.
        </Typography>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} variant="contained">
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

export default RegistrationSuccessModal;
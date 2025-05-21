import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface Props {
  open: boolean;
  mode: 'add' | 'edit';
  apartmentData: { number: string; tenant: string; tenantId: string; date: string };
  onClose: () => void;
  onChange: (field: string, value: any) => void;
  onSave: () => void;
  onDelete?: () => void;
}

const ApartmentModal: React.FC<Props> = ({ open, mode, apartmentData, onClose, onChange, onSave, onDelete }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{mode === 'edit' ? 'Edytuj mieszkanie' : 'Dodaj mieszkanie'}</DialogTitle>
    <DialogContent>
      <TextField label="Numer mieszkania" fullWidth sx={{ mb: 2 }} value={apartmentData.number} onChange={(e) => onChange('number', e.target.value)} />
      <TextField label="Najemca" fullWidth sx={{ mb: 2 }} value={apartmentData.tenant} onChange={(e) => onChange('tenant', e.target.value)} />
      <TextField label="ID Najemcy" fullWidth sx={{ mb: 2 }} value={apartmentData.tenantId} onChange={(e) => onChange('tenantId', e.target.value)} />
      <TextField label="Data" fullWidth sx={{ mb: 2 }} value={apartmentData.date} onChange={(e) => onChange('date', e.target.value)} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Anuluj</Button>
      <Button onClick={onSave}>Zapisz</Button>
      {mode === 'edit' && onDelete && <Button color="error" onClick={onDelete}>Usuń</Button>}
    </DialogActions>
  </Dialog>
);

export default ApartmentModal;

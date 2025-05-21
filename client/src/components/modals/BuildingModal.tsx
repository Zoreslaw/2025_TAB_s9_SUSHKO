import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface Props {
  open: boolean;
  mode: 'add' | 'edit';
  buildingData: { address: string; flats: number };
  onClose: () => void;
  onChange: (field: string, value: any) => void;
  onSave: () => void;
  onDelete?: () => void;
}

const BuildingModal: React.FC<Props> = ({ open, mode, buildingData, onClose, onChange, onSave, onDelete }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{mode === 'edit' ? 'Edytuj budynek' : 'Dodaj budynek'}</DialogTitle>
    <DialogContent>
      <TextField label="Adres" fullWidth sx={{ mb: 2 }} value={buildingData.address} onChange={(e) => onChange('address', e.target.value)} />
      <TextField label="Liczba mieszkań" type="number" fullWidth value={buildingData.flats} onChange={(e) => onChange('flats', parseInt(e.target.value) || 0)} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Anuluj</Button>
      <Button onClick={onSave}>Zapisz</Button>
      {mode === 'edit' && onDelete && <Button color="error" onClick={onDelete}>Usuń</Button>}
    </DialogActions>
  </Dialog>
);

export default BuildingModal;

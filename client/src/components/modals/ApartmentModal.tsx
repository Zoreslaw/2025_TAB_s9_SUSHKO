import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';
import { useApartments } from '../../hooks/useApartments';
import { useBuildings } from '../../hooks/useBuildings';
import { ApiApartment, ApiBuilding } from '../../services/api';

interface Props {
  open: boolean;
  mode: 'add' | 'edit';
  apartmentData?: ApiApartment;
  onClose: () => void;
}

const ApartmentModal: React.FC<Props> = ({ open, mode, apartmentData, onClose }) => {
  const [formData, setFormData] = useState({
    buildingId: 0,
    apartmentNumber: ''
  });

  const { buildings } = useBuildings();
  const { addApartment, updateApartment, deleteApartment } = useApartments({
    onSuccess: () => {
      onClose();
    }
  });

  useEffect(() => {
    if (apartmentData) {
      setFormData({
        buildingId: apartmentData.buildingId,
        apartmentNumber: apartmentData.apartmentNumber
      });
    } else {
      setFormData({
        buildingId: 0,
        apartmentNumber: ''
      });
    }
  }, [apartmentData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (mode === 'add') {
        await addApartment(formData);
      } else if (mode === 'edit' && apartmentData?.apartmentId) {
        await updateApartment(apartmentData.apartmentId, formData);
      }
    } catch (error) {
      console.error('Failed to save apartment:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleDelete = async () => {
    if (apartmentData?.apartmentId) {
      try {
        await deleteApartment(apartmentData.apartmentId);
      } catch (error) {
        console.error('Failed to delete apartment:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  const isSaveDisabled = !formData.apartmentNumber.trim() || formData.buildingId === 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'edit' ? 'Edytuj mieszkanie' : 'Dodaj mieszkanie'}</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField
          select
          label="Budynek"
          fullWidth
          sx={{ mb: 2, mt: 2 }}
          value={formData.buildingId}
          onChange={(e) => handleChange('buildingId', Number(e.target.value))}
          error={formData.buildingId === 0}
          helperText={formData.buildingId === 0 ? 'Wybierz budynek' : ''}
        >
          {buildings.map((building) => (
            <MenuItem key={building.buildingId} value={building.buildingId}>
              {building.address}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Numer mieszkania"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.apartmentNumber}
          onChange={(e) => handleChange('apartmentNumber', e.target.value)}
          error={!formData.apartmentNumber.trim()}
          helperText={!formData.apartmentNumber.trim() ? 'Numer mieszkania jest wymagany' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={handleSave} disabled={isSaveDisabled}>Zapisz</Button>
        {mode === 'edit' && (
          <Button color="error" onClick={handleDelete}>Usuń</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ApartmentModal;
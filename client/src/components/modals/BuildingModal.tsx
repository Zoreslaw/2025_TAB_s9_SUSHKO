import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useBuildings } from '../../hooks/useBuildings';

interface Props {
  open: boolean;
  mode: 'add' | 'edit';
  buildingData?: { buildingId?: number; address: string; flats: number };
  onClose: () => void;
}

const BuildingModal: React.FC<Props> = ({ open, mode, buildingData, onClose }) => {
  const [formData, setFormData] = useState({
    address: '',
    flats: 0
  });

  const { addBuilding, updateBuilding, deleteBuilding } = useBuildings({
    onSuccess: () => {
      onClose();
    }
  });

  useEffect(() => {
    if (buildingData) {
      setFormData({
        address: buildingData.address || '',
        flats: buildingData.flats || 0
      });
    } else {
      setFormData({
        address: '',
        flats: 0
      });
    }
  }, [buildingData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (mode === 'add') {
        await addBuilding(formData);
      } else if (mode === 'edit' && buildingData?.buildingId) {
        await updateBuilding(buildingData.buildingId, formData);
      }
    } catch (error) {
      console.error('Failed to save building:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleDelete = async () => {
    if (buildingData?.buildingId) {
      try {
        await deleteBuilding(buildingData.buildingId);
      } catch (error) {
        console.error('Failed to delete building:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'edit' ? 'Edytuj budynek' : 'Dodaj budynek'}</DialogTitle>
      <DialogContent>
        <TextField 
          label="Adres" 
          fullWidth 
          sx={{ mb: 2, mt: 2 }} 
          value={formData.address} 
          onChange={(e) => handleChange('address', e.target.value)} 
        />
        <TextField 
          label="Liczba mieszkań" 
          type="number" 
          fullWidth 
          value={formData.flats} 
          onChange={(e) => handleChange('flats', parseInt(e.target.value) || 0)} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={handleSave}>Zapisz</Button>
        {mode === 'edit' && <Button color="error" onClick={handleDelete}>Usuń</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default BuildingModal;

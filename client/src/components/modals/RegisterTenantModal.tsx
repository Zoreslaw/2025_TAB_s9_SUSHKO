import {
  Dialog, DialogTitle, DialogContent, TextField, MenuItem,
  Button, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRegisterTenantForm } from '../../hooks/useRegisterTenantForm';
import { useBuildings } from '../../hooks/useBuildings';
import { useApartments } from '../../hooks/useApartments';
import { useState, useMemo } from 'react';
import RegistrationSuccessModal from './RegistrationSuccessModal';

export default function RegisterTenantModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const { buildings } = useBuildings();
  const { apartments } = useApartments();
  
  const [selectedBuildingId, setSelectedBuildingId] = useState<number>(0);
  
  // Filter apartments by selected building
  const filteredApartments = useMemo(() => {
    if (!selectedBuildingId) return [];
    return apartments.filter(apartment => apartment.buildingId === selectedBuildingId);
  }, [apartments, selectedBuildingId]);

  const {
    form,
    errors,
    showSuccessModal,
    generatedPassword,
    handleChange,
    handleClose,
    handleSuccessModalClose,
    handleSubmit,
  } = useRegisterTenantForm({
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

  const handleBuildingChange = (buildingId: number) => {
    setSelectedBuildingId(buildingId);
    // Reset apartment selection when building changes
    handleChange('apartmentNumber')({ target: { value: '' } } as any);
    // Update the form with buildingId
    handleChange('buildingId')({ target: { value: buildingId.toString() } } as any);
  };

  return (
    <>
      <Dialog open={open} onClose={closeModal} maxWidth={'sm'} fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Zarejestruj najemcę
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
              label="Budynek"
              value={selectedBuildingId}
              onChange={(e) => handleBuildingChange(Number(e.target.value))}
              error={!selectedBuildingId}
              helperText={!selectedBuildingId ? 'Wybierz budynek' : ''}
              fullWidth
            >
              {buildings.map((building) => (
                <MenuItem key={building.buildingId} value={building.buildingId}>
                  {building.address}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Mieszkanie"
              value={form.apartmentNumber}
              onChange={handleChange('apartmentNumber')}
              error={errors.apartmentNumber}
              disabled={!selectedBuildingId}
              fullWidth
            >
              {filteredApartments.map((apartment) => (
                <MenuItem key={apartment.apartmentId} value={apartment.apartmentNumber}>
                  {apartment.apartmentNumber}
                </MenuItem>
              ))}
            </TextField>
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
              label="Data wyprowadzenia"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.moveOutDate}
              onChange={handleChange('moveOutDate')}
              error={errors.moveOutDate}
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

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Box, MenuItem, IconButton } from '@mui/material';
import { Apartment, ApartmentTenant } from '../../types/Apartment';
import { UserStatus } from '../../types/User';

interface Props {
  open: boolean;
  mode: 'add' | 'edit';
  apartmentData: Apartment;
  onClose: () => void;
  onChange: (field: string, value: any) => void;
  onSave: () => void;
  onDelete?: () => void;
}

const ApartmentModal: React.FC<Props> = ({
  open, mode, apartmentData, onClose, onChange, onSave, onDelete
}) => {
  // Helper for tenants editing
  const handleTenantChange = (idx: number, field: keyof ApartmentTenant, value: any) => {
    const updatedTenants = apartmentData.tenants.map((t, i) =>
      i === idx ? { ...t, [field]: value } : t
    );
    onChange('tenants', updatedTenants);
  };

  // Only allow adding if the last tenant has a non-empty tenantId and name
  const canAddTenant =
    apartmentData.tenants.length === 0 ||
    (
      apartmentData.tenants[apartmentData.tenants.length - 1].tenantId.trim() !== '' &&
      apartmentData.tenants[apartmentData.tenants.length - 1].name.trim() !== ''
    );

  const handleAddTenant = () => {
    if (!canAddTenant) return;
    onChange('tenants', [
      ...apartmentData.tenants,
      { tenantId: '', name: '', status: UserStatus.ACTIVE }
    ]);
  };

  const handleRemoveTenant = (idx: number) => {
    onChange('tenants', apartmentData.tenants.filter((_, i) => i !== idx));
  };

  // Validation for save button: all tenants must have name and tenantId, and apartment number must be filled
  const isSaveDisabled =
    !apartmentData.number.trim() ||
    apartmentData.tenants.some(t => t.name.trim() === '' || t.tenantId.trim() === '');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'edit' ? 'Edytuj mieszkanie' : 'Dodaj mieszkanie'}</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField
          label="Numer mieszkania"
          fullWidth
          sx={{ mb: 2, mt: 2 }}
          value={apartmentData.number}
          onChange={(e) => onChange('number', e.target.value)}
          error={!apartmentData.number.trim()}
          helperText={!apartmentData.number.trim() ? 'Numer mieszkania jest wymagany' : ''}
        />
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Najemcy</Typography>
        {apartmentData.tenants.map((tenant, idx) => (
          <Box key={idx} display="flex" gap={1} alignItems="center" sx={{ mb: 1 }}>
            <TextField
              label="Imię i nazwisko"
              value={tenant.name}
              onChange={e => handleTenantChange(idx, 'name', e.target.value)}
              sx={{ flex: 2 }}
              size="small"
              error={tenant.name.trim() === ''}
              helperText={tenant.name.trim() === '' ? 'Imię i nazwisko wymagane' : ''}
            />
            <TextField
              label="ID Najemcy"
              value={tenant.tenantId}
              onChange={e => handleTenantChange(idx, 'tenantId', e.target.value)}
              sx={{ flex: 1 }}
              size="small"
              error={tenant.tenantId.trim() === ''}
              helperText={tenant.tenantId.trim() === '' ? 'ID wymagane' : ''}
            />
            <TextField
              select
              label="Status"
              value={tenant.status}
              onChange={e => handleTenantChange(idx, 'status', e.target.value)}
              sx={{ flex: 1, minWidth: 120 }}
              size="small"
            >
              {Object.values(UserStatus).map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </TextField>
            <IconButton aria-label="Usuń" onClick={() => handleRemoveTenant(idx)} size="small">
              ❌
            </IconButton>
          </Box>
        ))}
        <Button onClick={handleAddTenant} sx={{ mb: 2 }} disabled={!canAddTenant}>Dodaj najemcę</Button>
        <TextField
          label="Data wprowadzenia"
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          value={apartmentData.moveInDate}
          onChange={(e) => onChange('moveInDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data wyprowadzenia"
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          value={apartmentData.moveOutDate || ''}
          onChange={(e) => onChange('moveOutDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={onSave} disabled={isSaveDisabled}>Zapisz</Button>
        {mode === 'edit' && onDelete && (
          <Button color="error" onClick={onDelete}>Usuń</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ApartmentModal;
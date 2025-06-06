import React, { useState } from 'react';
import {
  Box, Button, TextField, Autocomplete
} from '@mui/material';

import { useBuildings } from '../../hooks/useBuildings';
import { useApartments } from '../../hooks/useApartments';

import BuildingModal from '../../components/modals/BuildingModal';
import ApartmentModal from '../../components/modals/ApartmentModal';
import EditableTable, { ColumnConfig } from '../../components/EditableTable';

import { Building } from '../../types/Building';
import { Apartment } from '../../types/Apartment';

const ObjectPanel: React.FC = () => {
  const { buildings, addBuilding, updateBuilding, deleteBuilding } = useBuildings();
  const { apartments, addApartment, updateApartment, deleteApartment } = useApartments();

  const [openBuildingModal, setOpenBuildingModal] = useState(false);
  const [openApartmentModal, setOpenApartmentModal] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const [buildingData, setBuildingData] = useState<Building>({ address: '', flats: 0, id: 0 });
  const [apartmentData, setApartmentData] = useState<Apartment>({ number: '', tenant: '', tenantId: '', date: '', id: 0 });

  const [pageBuilding, setPageBuilding] = useState(1);
  const [rowsPerPageBuilding, setRowsPerPageBuilding] = useState(5);
  const [pageApartment, setPageApartment] = useState(1);
  const [rowsPerPageApartment, setRowsPerPageApartment] = useState(5);

  // Filter apartments by selected building if buildingId exists
  // If Apartment does not have buildingId, skip this block or add buildingId to Apartment type
  const filteredApartments = selectedBuilding
    ? apartments.filter((a: any) => a.buildingId === selectedBuilding.id)
    : apartments;

  const handleOpenBuildingModal = (mode: 'add' | 'edit', building?: Building) => {
    setMode(mode);
    setOpenBuildingModal(true);
    setBuildingData(building ?? { address: '', flats: 0, id: 0 });
    setSelectedBuilding(building ?? null);
  };

  const handleOpenApartmentModal = (mode: 'add' | 'edit', apartment?: Apartment) => {
    setMode(mode);
    setOpenApartmentModal(true);
    setApartmentData(apartment ?? { number: '', tenant: '', tenantId: '', date: '', id: 0 });
    setSelectedApartment(apartment ?? null);
  };

  const handleSaveBuilding = () => {
    if (mode === 'edit' && selectedBuilding) updateBuilding(selectedBuilding.id, buildingData);
    else addBuilding(buildingData);
    setOpenBuildingModal(false);
    setSelectedBuilding(null); // Reset selection
  };

  const handleSaveApartment = () => {
    if (mode === 'edit' && selectedApartment) updateApartment(selectedApartment.id, apartmentData);
    else addApartment(apartmentData);
    setOpenApartmentModal(false);
    setSelectedApartment(null); // Reset selection
  };

  const handleInlineEditBuilding = (id: number, key: keyof Building, value: any) =>
    updateBuilding(id, { [key]: value });

  const handleInlineEditApartment = (id: number, key: keyof Apartment, value: any) =>
    updateApartment(id, { [key]: value });

  const buildingColumns: ColumnConfig<Building>[] = [
    { key: 'address', label: 'Adres' },
    { key: 'flats', label: 'Liczba mieszkań', type: 'number' }
  ];

  const apartmentColumns: ColumnConfig<Apartment>[] = [
    { key: 'number', label: 'Numer mieszkania' },
    { key: 'tenant', label: 'Najemca' },
    { key: 'tenantId', label: 'ID Najemcy' },
    { key: 'date', label: 'Data', type: 'date' }
  ];

  return (
    <Box p={2}>
      {/* Buildings */}
      <Box mb={2} display="flex" gap={2} alignItems="center">
        <Autocomplete
          options={buildings}
          getOptionLabel={(b) => b.address}
          onChange={(_, val) => setSelectedBuilding(val)}
          value={selectedBuilding}
          renderInput={(params) => <TextField {...params} label="Adres" variant="outlined" />}
        />
        <Button variant="outlined" disabled={!selectedBuilding} onClick={() => handleOpenBuildingModal('edit', selectedBuilding ?? undefined)}>Edytuj</Button>
        <Button variant="contained" onClick={() => handleOpenBuildingModal('add')}>Dodaj</Button>
      </Box>

      <EditableTable
        data={buildings}
        columns={buildingColumns}
        selected={selectedBuilding}
        onSelect={setSelectedBuilding}
        onChange={handleInlineEditBuilding}
        rowsPerPage={rowsPerPageBuilding}
        setRowsPerPage={setRowsPerPageBuilding}
        page={pageBuilding}
        setPage={setPageBuilding}
        getId={(b) => b.id}
      />

      <BuildingModal
        open={openBuildingModal}
        mode={mode}
        buildingData={buildingData}
        onClose={() => setOpenBuildingModal(false)}
        onChange={(key, value) => setBuildingData(prev => ({ ...prev, [key]: value }))}
        onSave={handleSaveBuilding}
        onDelete={mode === 'edit' ? () => {
          if (selectedBuilding) deleteBuilding(selectedBuilding.id);
          setOpenBuildingModal(false);
          setSelectedBuilding(null); // Reset selection
        } : undefined}
      />

      {/* Apartments */}
      <Box mb={2} mt={4} display="flex" gap={2} alignItems="center">
        <Autocomplete
          options={filteredApartments}
          getOptionLabel={(a) => a.number}
          onChange={(_, val) => setSelectedApartment(val)}
          value={selectedApartment}
          renderInput={(params) => <TextField {...params} label="Numer" variant="outlined" />}
        />
        <Button variant="outlined" disabled={!selectedApartment} onClick={() => handleOpenApartmentModal('edit', selectedApartment ?? undefined)}>Edytuj</Button>
        <Button variant="contained" onClick={() => handleOpenApartmentModal('add')}>Dodaj</Button>
      </Box>

      <EditableTable
        data={filteredApartments}
        columns={apartmentColumns}
        selected={selectedApartment}
        onSelect={setSelectedApartment}
        onChange={handleInlineEditApartment}
        rowsPerPage={rowsPerPageApartment}
        setRowsPerPage={setRowsPerPageApartment}
        page={pageApartment}
        setPage={setPageApartment}
        getId={(a) => a.id}
      />

      <ApartmentModal
        open={openApartmentModal}
        mode={mode}
        apartmentData={apartmentData}
        onClose={() => setOpenApartmentModal(false)}
        onChange={(key, value) => setApartmentData(prev => ({ ...prev, [key]: value }))}
        onSave={handleSaveApartment}
        onDelete={mode === 'edit' ? () => {
          if (selectedApartment) deleteApartment(selectedApartment.id);
          setOpenApartmentModal(false);
          setSelectedApartment(null); // Reset selection
        } : undefined}
      />
    </Box>
  );
};

export default ObjectPanel;
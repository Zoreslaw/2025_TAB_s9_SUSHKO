import React, { useMemo, useState } from 'react';
import {
  Box, Button, TextField, Autocomplete
} from '@mui/material';

import { useBuildings } from '../../hooks/useBuildings';
import { useApartments } from '../../hooks/useApartments';
import { ApiBuilding, ApiApartment } from '../../services/api';

import BuildingModal from '../../components/modals/BuildingModal';
import ApartmentModal from '../../components/modals/ApartmentModal';
import EditableTable, { ColumnConfig } from '../../components/EditableTable';

const ObjectPanel: React.FC = () => {
  const { buildings, loading: buildingsLoading, error: buildingsError, updateBuilding } = useBuildings();
  const { apartments, loading: apartmentsLoading, error: apartmentsError, updateApartment } = useApartments();

  const [openBuildingModal, setOpenBuildingModal] = useState(false);
  const [openApartmentModal, setOpenApartmentModal] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const [selectedBuilding, setSelectedBuilding] = useState<ApiBuilding | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<ApiApartment | null>(null);

  const [pageBuilding, setPageBuilding] = useState(1);
  const [rowsPerPageBuilding, setRowsPerPageBuilding] = useState(5);
  const [pageApartment, setPageApartment] = useState(1);
  const [rowsPerPageApartment, setRowsPerPageApartment] = useState(5);

  // Filter apartments by selected building
  const filteredApartments = useMemo(() => {
    if (!selectedBuilding) return apartments;
    return apartments.filter((apartment) => apartment.buildingId === selectedBuilding.buildingId);
  }, [apartments, selectedBuilding]);

  // Buildings with apartment count
  const buildingsWithFlatCount = useMemo(() => {
    return buildings.map(building => ({
      ...building,
      flats: apartments.filter(apartment => apartment.buildingId === building.buildingId).length
    }));
  }, [buildings, apartments]);

  const handleOpenBuildingModal = (modalMode: 'add' | 'edit', building?: ApiBuilding) => {
    setMode(modalMode);
    setOpenBuildingModal(true);
    if (building) {
      setSelectedBuilding(building);
    }
  };

  const handleOpenApartmentModal = (modalMode: 'add' | 'edit', apartment?: ApiApartment) => {
    setMode(modalMode);
    setOpenApartmentModal(true);
    if (apartment) {
      setSelectedApartment(apartment);
    }
  };

  const handleCloseBuildingModal = () => {
    setOpenBuildingModal(false);
    setSelectedBuilding(null);
  };

  const handleCloseApartmentModal = () => {
    setOpenApartmentModal(false);
    setSelectedApartment(null);
  };

  const handleBuildingChange = (id: number, key: keyof ApiBuilding, value: any) => {
    updateBuilding(id, { [key]: value });
  };

  const handleApartmentChange = (id: number, key: keyof ApiApartment, value: any) => {
    updateApartment(id, { [key]: value });
  };

  const buildingColumns: ColumnConfig<ApiBuilding>[] = [
    { key: 'address', label: 'Adres' },
    { key: 'flats', label: 'Liczba mieszkań', type: 'number' }
  ];

  const apartmentColumns: ColumnConfig<ApiApartment>[] = [
    { key: 'apartmentNumber', label: 'Numer mieszkania' },
    { key: 'buildingAddress', label: 'Adres budynku' }
  ];

  if (buildingsLoading || apartmentsLoading) {
    return <Box p={2}>Ładowanie...</Box>;
  }

  if (buildingsError || apartmentsError) {
    return <Box p={2}>Błąd: {buildingsError || apartmentsError}</Box>;
  }

  return (
    <Box p={2}>
      {/* Buildings */}
      <Box mb={2} display="flex" gap={2} alignItems="center">
        <Autocomplete
          options={buildings}
          getOptionLabel={(b) => b.address}
          onChange={(_, val) => setSelectedBuilding(val)}
          value={selectedBuilding}
          renderInput={(params) => <TextField {...params} label="Wybierz budynek" variant="outlined" sx={{ width: 350 }} />}
        />
        <Button 
          variant="outlined" 
          disabled={!selectedBuilding} 
          onClick={() => handleOpenBuildingModal('edit', selectedBuilding ?? undefined)}
        >
          Edytuj
        </Button>
        <Button variant="contained" onClick={() => handleOpenBuildingModal('add')}>
          Dodaj budynek
        </Button>
      </Box>

      <EditableTable
        data={buildingsWithFlatCount}
        columns={buildingColumns}
        selected={selectedBuilding}
        onSelect={setSelectedBuilding}
        onChange={handleBuildingChange}
        rowsPerPage={rowsPerPageBuilding}
        setRowsPerPage={setRowsPerPageBuilding}
        page={pageBuilding}
        setPage={setPageBuilding}
        getId={(b) => b.buildingId}
      />

      <BuildingModal
        open={openBuildingModal}
        mode={mode}
        buildingData={selectedBuilding || undefined}
        onClose={handleCloseBuildingModal}
      />

      {/* Apartments */}
      <Box mb={2} mt={4} display="flex" gap={2} alignItems="center">
        <Autocomplete
          options={filteredApartments}
          getOptionLabel={(a) => `${a.apartmentNumber} - ${a.buildingAddress}`}
          onChange={(_, val) => setSelectedApartment(val)}
          value={selectedApartment}
          renderInput={(params) => <TextField {...params} label="Wybierz mieszkanie" variant="outlined" sx={{ width: 350 }} />}
        />
        <Button 
          variant="outlined" 
          disabled={!selectedApartment} 
          onClick={() => handleOpenApartmentModal('edit', selectedApartment ?? undefined)}
        >
          Edytuj
        </Button>
        <Button 
          variant="contained" 
          onClick={() => handleOpenApartmentModal('add')}
          disabled={!selectedBuilding}
        >
          Dodaj mieszkanie
        </Button>
      </Box>

      <EditableTable
        data={filteredApartments}
        columns={apartmentColumns}
        selected={selectedApartment}
        onSelect={setSelectedApartment}
        onChange={handleApartmentChange}
        rowsPerPage={rowsPerPageApartment}
        setRowsPerPage={setRowsPerPageApartment}
        page={pageApartment}
        setPage={setPageApartment}
        getId={(a) => a.apartmentId}
      />

      <ApartmentModal
        open={openApartmentModal}
        mode={mode}
        apartmentData={selectedApartment || undefined}
        onClose={handleCloseApartmentModal}
      />
    </Box>
  );
};

export default ObjectPanel;
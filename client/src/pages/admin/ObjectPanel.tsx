import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle, 
  Autocomplete, Pagination, FormControl, InputLabel, Paper, Select, MenuItem, SelectChangeEvent
} from '@mui/material';

const ObjectPanel: React.FC = () => {
  // Modal windows
  const [openBuildingModal, setOpenBuildingModal] = useState(false);
  const [openApartmentModal, setOpenApartmentModal] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  // Selections for tables
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedApartment, setSelectedApartment] = useState<any>(null);

  // Data
  const [buildingData, setBuildingData] = useState({ address: "", flats: 0 });
  const [apartmentData, setApartmentData] = useState({ number: "", tenant: "", tenantId: "", date: "" });

  // Pagination state
  const [pageBuilding, setPageBuilding] = useState(1);
  const [rowsPerPageBuilding, setRowsPerPageBuilding] = useState(5);

  const [pageApartment, setPageApartment] = useState(1);
  const [rowsPerPageApartment, setRowsPerPageApartment] = useState(5);

  // Unique ID (mock data)
  const [nextBuildingId, setNextBuildingId] = useState(4);
  const [nextApartmentId, setNextApartmentId] = useState(4);


  // Mock data for buildings (copies for pagitation testing)
  const [buildings, setBuildings] = useState([
    { id: 1, address: "Lipowa 12", flats: 100 },
    { id: 2, address: "Kwiatowa 22", flats: 22 },
    { id: 3, address: "Lipowa 13", flats: 33 },
    { id: 4, address: "Lipowa 13", flats: 33 },
    { id: 5, address: "Lipowa 13", flats: 33 },
    { id: 6, address: "Lipowa 13", flats: 33 },
    { id: 7, address: "Lipowa 13", flats: 33 },
  ]);

  // Mock data for apartments (copies for pagitation testing)
  const [apartments, setApartments] = useState([
    { id: 1, number: "101", tenant: "Jan Kowalski", tenantId: "A123", date: "2025-01-01" },
    { id: 2, number: "102", tenant: "Anna Nowak", tenantId: "B456", date: "2025-02-15" },
    { id: 3, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
    { id: 4, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
    { id: 5, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
    { id: 6, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
    { id: 7, number: "103", tenant: "Piotr Zielinski", tenantId: "C789", date: "2025-03-20" },
  ]);

  // Calculated values for table pagitation
  const paginatedBuildings = buildings.slice((pageBuilding - 1) * rowsPerPageBuilding, pageBuilding * rowsPerPageBuilding);
  const paginatedApartments = apartments.slice((pageApartment - 1) * rowsPerPageApartment, pageApartment * rowsPerPageApartment);


  // Handlers
  const handleOpenBuildingModal = (mode: 'add' | 'edit', building?: any) => {
    setMode(mode);
    if (mode === 'edit' && building) {
      setBuildingData(building);
      setSelectedBuilding(building);
    } else {
      setBuildingData({ address: "", flats: 0 });
      setSelectedBuilding(null);
    }
    setOpenBuildingModal(true);
  };

  const handleCloseBuildingModal = () => setOpenBuildingModal(false);

  const handleOpenApartmentModal = (mode: 'add' | 'edit', apartment?: any) => {
    setMode(mode);
    if (mode === 'edit' && apartment) {
      setApartmentData(apartment);
      setSelectedApartment(apartment);
    } else {
      setApartmentData({ number: "", tenant: "", tenantId: "", date: "" });
      setSelectedApartment(null);
    }
    setOpenApartmentModal(true);
  };

  const handleCloseApartmentModal = () => setOpenApartmentModal(false);

  const handleBuildingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingData({
      ...buildingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApartmentData({
      ...apartmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveBuilding = () => {
    if (mode === 'edit' && selectedBuilding) {
      setBuildings(prev =>
        prev.map(b => (b.id === selectedBuilding.id ? { ...selectedBuilding, ...buildingData } : b))
      );
    } else if (mode === 'add') {
      setBuildings(prev => [
        ...prev,
        { ...buildingData, id: nextBuildingId },
      ]);
      setNextBuildingId(prev => prev + 1);
    }
    handleCloseBuildingModal();
  };
  

  const handleSaveApartment = () => {
    if (mode === 'edit' && selectedApartment) {
      setApartments(prev =>
        prev.map(a => (a.id === selectedApartment.id ? { ...selectedApartment, ...apartmentData } : a))
      );
    } else if (mode === 'add') {
      setApartments(prev => [
        ...prev,
        { ...apartmentData, id: nextApartmentId },
      ]);
      setNextApartmentId(prev => prev + 1);
    }
    handleCloseApartmentModal();
  };

  const handleDeleteBuilding = () => {
    if (selectedBuilding) {
      setBuildings(prev =>
        prev.filter(b => b.id !== selectedBuilding.id)
      );
      setSelectedBuilding(null);
      handleCloseBuildingModal();
    }
  };

  const handleDeleteApartment = () => {
    if (selectedApartment) {
      setApartments(prev =>
        prev.filter(a => a.id !== selectedApartment.id)
      );
      setSelectedApartment(null);
      handleCloseApartmentModal();
    }
  };

  const handleSelectBuilding = (building: any) => {
    setSelectedBuilding(building);
    setMode('edit');
  };

  const handleSelectApartment = (apartment: any) => {
    setSelectedApartment(apartment);
    setMode('edit');
  };

  const handleChangePageBuilding = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPageBuilding(newPage);
  };

  const handleChangeRowsPerPageBuilding = (event: SelectChangeEvent<number>) => {
    setRowsPerPageBuilding(Number(event.target.value));
    setPageBuilding(1); 
  };

  const handleChangePageApartment = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPageApartment(newPage);
  };

  const handleChangeRowsPerPageApartment = (event: SelectChangeEvent<number>) => {
    setRowsPerPageApartment(Number(event.target.value));
    setPageApartment(1); 
  };

  // Return
  return (
    <div style={{ padding: 20 }}>
      {/* Buildings */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {/* Autocomplete text field with suggestions and selection */}
        <Autocomplete
          options={buildings}
          getOptionLabel={(option) => option.address}
          renderInput={(params) => <TextField {...params} label="Adres" variant="outlined" />}
          onChange={(event, newValue) => {
            setSelectedBuilding(newValue);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedBuilding}
          sx={{ minWidth: 200 }}
        />

        {/* "Edytuj" button */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleOpenBuildingModal('edit', selectedBuilding)}
          disabled={!selectedBuilding}
        >
          Edytuj
        </Button>

        {/* "Dodaj" button */}
        <Button variant="contained" color="primary" onClick={() => handleOpenBuildingModal('add')}>
          Dodaj
        </Button>
      </Box>

      {/* List of buildings */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lp.</TableCell>
              <TableCell>Adres</TableCell>
              <TableCell>Liczba mieszkań</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBuildings.map((b, index) => (
              <TableRow
                key={b.id}
                hover
                onClick={() => handleSelectBuilding(b)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: selectedBuilding?.id === b.id ? '#f0f0f0' : 'transparent',
                }}
              >
                <TableCell>{(pageBuilding - 1) * rowsPerPageBuilding + index + 1}</TableCell>
                <TableCell>{b.address}</TableCell>
                <TableCell>{b.flats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination for buildings */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mt: 2 }}>
        <FormControl variant="outlined" size="small">
          <InputLabel>Rows per page</InputLabel>
          <Select
            value={rowsPerPageBuilding}
            onChange={handleChangeRowsPerPageBuilding}
            label="Rows per page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={Math.ceil(buildings.length / rowsPerPageBuilding)}
          page={pageBuilding}
          onChange={handleChangePageBuilding}
        />
      </Box>

      {/* Building Modal */}
      <Dialog open={openBuildingModal} onClose={handleCloseBuildingModal}>
        <DialogTitle>{mode === 'edit' ? 'Edytuj budynek' : 'Dodaj budynek'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Adres"
            variant="outlined"
            name="address"
            fullWidth
            value={buildingData.address}
            onChange={handleBuildingChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Liczba mieszkań"
            variant="outlined"
            name="flats"
            type="number"
            fullWidth
            value={buildingData.flats}
            onChange={handleBuildingChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBuildingModal}>Anuluj</Button>
          <Button onClick={handleSaveBuilding}>Zapisz</Button>
          {mode === 'edit' && <Button onClick={handleDeleteBuilding} color="error">Usuń</Button>}
        </DialogActions>
      </Dialog>


      {/* Apartments */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, mt: 2 }}>
        {/* Autocomplete text field with suggestions and selection */}
        <Autocomplete
          options={apartments}
          getOptionLabel={(option) => option.number}
          renderInput={(params) => <TextField {...params} label="Numer" variant="outlined" />}
          onChange={(event, newValue) => {
            setSelectedApartment(newValue);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedApartment}
          sx={{ minWidth: 200 }}
        />

        {/* "Edytuj" button */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleOpenApartmentModal('edit', selectedApartment)}
          disabled={!selectedApartment}
        >
          Edytuj
        </Button>

        {/* "Dodaj" button */}
        <Button variant="contained" color="primary" onClick={() => handleOpenApartmentModal('add')}>
          Dodaj
        </Button>
      </Box>

      {/* List of Apartments */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lp.</TableCell>
              <TableCell>Numer mieszkania</TableCell>
              <TableCell>Najemca</TableCell>
              <TableCell>ID Najemcy</TableCell>
              <TableCell>Data Wprowadzenia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedApartments.map((a, index) => (
              <TableRow
                key={a.id}
                hover
                onClick={() => handleSelectApartment(a)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: selectedApartment?.id === a.id ? '#f0f0f0' : 'transparent',
                }}
              >
                <TableCell>{(pageApartment - 1) * rowsPerPageApartment + index + 1}</TableCell>
                <TableCell>{a.number}</TableCell>
                <TableCell>{a.tenant}</TableCell>
                <TableCell>{a.tenantId}</TableCell>
                <TableCell>{a.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination for apartments */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <FormControl variant="outlined" size="small">
          <InputLabel>Rows per page</InputLabel>
          <Select
            value={rowsPerPageApartment}
            onChange={handleChangeRowsPerPageApartment}
            label="Rows per page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={Math.ceil(apartments.length / rowsPerPageApartment)}
          page={pageApartment}
          onChange={handleChangePageApartment}
        />
      </Box>

      {/* Apartment Modal */}
      <Dialog open={openApartmentModal} onClose={handleCloseApartmentModal}>
        <DialogTitle>{mode === 'edit' ? 'Edytuj mieszkanie' : 'Dodaj mieszkanie'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Numer mieszkania"
            variant="outlined"
            name="number"
            fullWidth
            value={apartmentData.number}
            onChange={handleApartmentChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Najemca"
            variant="outlined"
            name="tenant"
            fullWidth
            value={apartmentData.tenant}
            onChange={handleApartmentChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="ID Najemcy"
            variant="outlined"
            name="tenantId"
            fullWidth
            value={apartmentData.tenantId}
            onChange={handleApartmentChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Data Wprowadzenia"
            variant="outlined"
            name="date"
            fullWidth
            value={apartmentData.date}
            onChange={handleApartmentChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApartmentModal}>Anuluj</Button>
          <Button onClick={handleSaveApartment}>Zapisz</Button>
          {mode === 'edit' && <Button onClick={handleDeleteApartment} color="error">Usuń</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ObjectPanel;

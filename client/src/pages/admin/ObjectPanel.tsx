import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle,
  Autocomplete, Pagination, FormControl, InputLabel, Paper, Select, MenuItem
} from '@mui/material';
import { useBuildings } from '../../hooks/useBuildings';
import { useApartments } from '../../hooks/useApartments';


const ObjectPanel: React.FC = () => {
  const { buildings, addBuilding, updateBuilding, deleteBuilding } = useBuildings();
  const { apartments, addApartment, updateApartment, deleteApartment } = useApartments();

  const [openBuildingModal, setOpenBuildingModal] = useState(false);
  const [openApartmentModal, setOpenApartmentModal] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedApartment, setSelectedApartment] = useState<any>(null);

  const [buildingData, setBuildingData] = useState({ address: '', flats: 0 });
  const [apartmentData, setApartmentData] = useState({ number: '', tenant: '', tenantId: '', date: '' });

  const [pageBuilding, setPageBuilding] = useState(1);
  const [rowsPerPageBuilding, setRowsPerPageBuilding] = useState(5);
  const [pageApartment, setPageApartment] = useState(1);
  const [rowsPerPageApartment, setRowsPerPageApartment] = useState(5);

  const paginatedBuildings = buildings.slice((pageBuilding - 1) * rowsPerPageBuilding, pageBuilding * rowsPerPageBuilding);
  const paginatedApartments = apartments.slice((pageApartment - 1) * rowsPerPageApartment, pageApartment * rowsPerPageApartment);

  const handleOpenBuildingModal = (mode: 'add' | 'edit', building?: any) => {
    setMode(mode);
    setOpenBuildingModal(true);
    setBuildingData(building ?? { address: '', flats: 0 });
    setSelectedBuilding(building ?? null);
  };

  const handleOpenApartmentModal = (mode: 'add' | 'edit', apartment?: any) => {
    setMode(mode);
    setOpenApartmentModal(true);
    setApartmentData(apartment ?? { number: '', tenant: '', tenantId: '', date: '' });
    setSelectedApartment(apartment ?? null);
  };

  const handleSaveBuilding = () => {
    if (mode === 'edit' && selectedBuilding) updateBuilding(selectedBuilding.id, buildingData);
    else addBuilding(buildingData);
    setOpenBuildingModal(false);
  };

  const handleSaveApartment = () => {
    if (mode === 'edit' && selectedApartment) updateApartment(selectedApartment.id, apartmentData);
    else addApartment(apartmentData);
    setOpenApartmentModal(false);
  };

  const handleInlineEditBuilding = (id: number, key: string, value: any) => updateBuilding(id, { [key]: value });
  const handleInlineEditApartment = (id: number, key: string, value: any) => updateApartment(id, { [key]: value });

  return (
    <div style={{ padding: 20 }}>
      {/* Buildings */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {/* Autocomplete text field with suggestions and selection */}
        <Autocomplete
          options={buildings}
          getOptionLabel={(b) => b.address}
          onChange={(_, val) => setSelectedBuilding(val)}
          value={selectedBuilding}
          renderInput={(params) => <TextField {...params} label="Adres" variant="outlined" />}
        />
        <Button variant="outlined" disabled={!selectedBuilding} onClick={() => handleOpenBuildingModal('edit', selectedBuilding)}>Edytuj</Button>
        <Button variant="contained" onClick={() => handleOpenBuildingModal('add')}>Dodaj</Button>
      </Box>

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
            {paginatedBuildings.map((b, i) => (
              <TableRow key={b.id} hover selected={selectedBuilding?.id === b.id} onClick={() => setSelectedBuilding(b)}>
                <TableCell>{(pageBuilding - 1) * rowsPerPageBuilding + i + 1}</TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={b.address}
                    onChange={(e) => handleInlineEditBuilding(b.id, 'address', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    type="number"
                    value={b.flats}
                    onChange={(e) => handleInlineEditBuilding(b.id, 'flats', parseInt(e.target.value) || 0)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <FormControl size="small">
          <InputLabel>Rows</InputLabel>
          <Select value={rowsPerPageBuilding} onChange={(e) => { setRowsPerPageBuilding(Number(e.target.value)); setPageBuilding(1); }}>
            {[5, 10, 15].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </Select>
        </FormControl>
        <Pagination count={Math.ceil(buildings.length / rowsPerPageBuilding)} page={pageBuilding} onChange={(_, p) => setPageBuilding(p)} />
      </Box>

      <Dialog open={openBuildingModal} onClose={() => setOpenBuildingModal(false)}>
        <DialogTitle>{mode === 'edit' ? 'Edytuj budynek' : 'Dodaj budynek'}</DialogTitle>
        <DialogContent>
          <TextField label="Adres" fullWidth sx={{ mb: 2 }} name="address" value={buildingData.address} onChange={(e) => setBuildingData({ ...buildingData, address: e.target.value })} />
          <TextField label="Liczba mieszkań" type="number" fullWidth name="flats" value={buildingData.flats} onChange={(e) => setBuildingData({ ...buildingData, flats: parseInt(e.target.value) || 0 })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuildingModal(false)}>Anuluj</Button>
          <Button onClick={handleSaveBuilding}>Zapisz</Button>
          {mode === 'edit' && <Button color="error" onClick={() => { deleteBuilding(selectedBuilding.id); setOpenBuildingModal(false); }}>Usuń</Button>}
        </DialogActions>
      </Dialog>

      {/* Apartments */}
      <Box mb={2} mt={4} display="flex" gap={2} alignItems="center">
        <Autocomplete
          options={apartments}
          getOptionLabel={(a) => a.number}
          onChange={(_, val) => setSelectedApartment(val)}
          value={selectedApartment}
          renderInput={(params) => <TextField {...params} label="Numer" variant="outlined" />}
        />
        <Button variant="outlined" disabled={!selectedApartment} onClick={() => handleOpenApartmentModal('edit', selectedApartment)}>Edytuj</Button>
        <Button variant="contained" onClick={() => handleOpenApartmentModal('add')}>Dodaj</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lp.</TableCell>
              <TableCell>Numer mieszkania</TableCell>
              <TableCell>Najemca</TableCell>
              <TableCell>ID Najemcy</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedApartments.map((a, i) => (
              <TableRow key={a.id} hover selected={selectedApartment?.id === a.id} onClick={() => setSelectedApartment(a)}>
                <TableCell>{(pageApartment - 1) * rowsPerPageApartment + i + 1}</TableCell>
                <TableCell><TextField variant="standard" value={a.number} onChange={(e) => handleInlineEditApartment(a.id, 'number', e.target.value)} fullWidth /></TableCell>
                <TableCell><TextField variant="standard" value={a.tenant} onChange={(e) => handleInlineEditApartment(a.id, 'tenant', e.target.value)} fullWidth /></TableCell>
                <TableCell><TextField variant="standard" value={a.tenantId} onChange={(e) => handleInlineEditApartment(a.id, 'tenantId', e.target.value)} fullWidth /></TableCell>
                <TableCell><TextField variant="standard" value={a.date} onChange={(e) => handleInlineEditApartment(a.id, 'date', e.target.value)} fullWidth /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <FormControl size="small">
          <InputLabel>Rows</InputLabel>
          <Select value={rowsPerPageApartment} onChange={(e) => { setRowsPerPageApartment(Number(e.target.value)); setPageApartment(1); }}>
            {[5, 10, 15].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </Select>
        </FormControl>
        <Pagination count={Math.ceil(apartments.length / rowsPerPageApartment)} page={pageApartment} onChange={(_, p) => setPageApartment(p)} />
      </Box>

      <Dialog open={openApartmentModal} onClose={() => setOpenApartmentModal(false)}>
        <DialogTitle>{mode === 'edit' ? 'Edytuj mieszkanie' : 'Dodaj mieszkanie'}</DialogTitle>
        <DialogContent>
          <TextField label="Numer mieszkania" fullWidth sx={{ mb: 2 }} value={apartmentData.number} onChange={(e) => setApartmentData({ ...apartmentData, number: e.target.value })} />
          <TextField label="Najemca" fullWidth sx={{ mb: 2 }} value={apartmentData.tenant} onChange={(e) => setApartmentData({ ...apartmentData, tenant: e.target.value })} />
          <TextField label="ID Najemcy" fullWidth sx={{ mb: 2 }} value={apartmentData.tenantId} onChange={(e) => setApartmentData({ ...apartmentData, tenantId: e.target.value })} />
          <TextField label="Data" fullWidth sx={{ mb: 2 }} value={apartmentData.date} onChange={(e) => setApartmentData({ ...apartmentData, date: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApartmentModal(false)}>Anuluj</Button>
          <Button onClick={handleSaveApartment}>Zapisz</Button>
          {mode === 'edit' && <Button color="error" onClick={() => { deleteApartment(selectedApartment.id); setOpenApartmentModal(false); }}>Usuń</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ObjectPanel;
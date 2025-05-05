import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import { Button, Stack, Box, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import RegisterUserModal from '../../components/modals/RegisterUserModal';
import EditUserModal from '../../components/modals/EditUserModal';


// Returns dash, if value is null
export function renderValueOrDash(params: GridRenderCellParams) {
  return params.value ?? '-';
}

// Returns dash, if date is null
export function renderDateOrDash(params: GridRenderCellParams) {
  return params.value ? new Date(params.value).toLocaleDateString() : '-';
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Imię', width: 130 },
  { field: 'lastName', headerName: 'Nazwisko', width: 130 },
  { field: 'role', headerName: 'Rodzaj konta', width: 130, },
  { field: 'status', headerName: 'Status', width: 130, },
  { field: 'adress', headerName: 'Adres', width: 160, renderCell: renderValueOrDash },
  { field: 'apartementNumber', headerName: 'Numer mieszkania', type: 'number', align: 'left', width: 140, renderCell: renderValueOrDash },
  { field: 'moveinDate', headerName: 'Data wprowadzenia', type: 'date', width: 160, renderCell: renderDateOrDash },
  { field: 'moveoutDate', headerName: 'Data wyprowadzenia', type: 'date', width: 160, renderCell: renderDateOrDash },
];

// Random mock data
const rows = [
  { id: 1, 
    lastName: 'Snow', 
    firstName: 'Jon', 
    role: 'Administrator', 
    status: 'Aktywny',
    adress: 'Kwiatowa 12',
    apartementNumber: 23,
    moveinDate: new Date('2022-03-22'),
    moveoutDate: new Date('2044-12-11') },
    { 
      id: 2, 
      lastName: 'Kowalski', 
      firstName: 'Adam', 
      role: 'Menadżer', 
      status: 'Aktywny',
      adress: null,
      apartementNumber: null,
      moveinDate: null,
      moveoutDate: null
  },
  { 
      id: 3, 
      lastName: 'Nowak', 
      firstName: 'Anna', 
      role: 'Mieszkaniec', 
      status: 'Nieaktywny',
      adress: 'Jasnogórska 4',
      apartementNumber: 2,
      moveinDate: new Date('2020-08-01'),
      moveoutDate: new Date('2024-02-22') 
  },
  { 
      id: 4, 
      lastName: 'Szymański', 
      firstName: 'Marek', 
      role: 'Menadżer', 
      status: 'Aktywny',
      adress: null,
      apartementNumber: null,
      moveinDate: null,
      moveoutDate: null
  },
  { 
      id: 5, 
      lastName: 'Wiśniewski', 
      firstName: 'Michał', 
      role: 'Najemca', 
      status: 'Aktywny',
      adress: 'Wielka 28',
      apartementNumber: 5,
      moveinDate: new Date('2023-01-10')
  },
  { 
      id: 6, 
      lastName: 'Zieliński', 
      firstName: 'Karolina', 
      role: 'Menadżer', 
      status: 'Aktywny',
      adress: null,
      apartementNumber: null,
      moveinDate: null,
      moveoutDate: null
  },
  { 
      id: 7, 
      lastName: 'Mazur', 
      firstName: 'Paweł', 
      role: 'Mieszkaniec', 
      status: 'Nieaktywny',
      adress: 'Zielona 9',
      apartementNumber: 12,
      moveinDate: new Date('2018-03-10'),
      moveoutDate: new Date('2022-07-30') 
  },
  { 
      id: 8, 
      lastName: 'Jankowski', 
      firstName: 'Tomasz', 
      role: 'Najemca', 
      status: 'Aktywny',
      adress: 'Lwowska 13',
      apartementNumber: 9,
      moveinDate: new Date('2022-07-15'),
      moveoutDate: new Date('2031-09-20') 
  }
];

const paginationModel = { page: 0, pageSize: 10 };

const UserManagementPanel: React.FC = () => {

  const [search, setSearch] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      val?.toString().toLowerCase().includes(search)
    )
  );

  return (
    <Paper sx={{ height: 800, width: '98%', marginTop: '1px', boxShadow:0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>

        <Stack direction="row" spacing={2}>

          {/* Search field */}
          <TextField
            size="small"
            label="Wyszukaj..."
            value={search}
            onChange={handleSearchChange}
          />

          {/* Edit user button */}
          <Button variant="outlined">Edytuj</Button>

          {/* Add new user button */}
          <RegisterUserModal />

        </Stack>
      </Box>

      {/* Table */}
      <DataGrid
        rows={filteredRows}
        columns={columns}

        initialState={{ pagination: { paginationModel } }}
      
        sx={{ border: 0 }}
      />
    </Paper>
  );

};

export default UserManagementPanel;
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Imię', width: 130 },
  { field: 'lastName', headerName: 'Nazwisko', width: 130 },
  { field: 'role', headerName: 'Rodzaj konta', width: 130, },
  { field: 'status', headerName: 'Status', width: 130, },
  { field: 'adress', headerName: 'Adres', width: 160, },
  { field: 'apartementNumber', headerName: 'Numer mieszkania', type: 'number', align: 'left', width: 140, },
  { field: 'moveinDate', headerName: 'Data wprowadzenia', type: 'date', width: 160, },
  { field: 'moveoutDate', headerName: 'Data wyprowadzenia', type: 'date', width: 160, },
];

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
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function UsersTable() {
  return (
    <Paper sx={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 20]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
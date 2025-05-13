import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import { Button, Stack, Box, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import RegisterUserModal from '../../components/modals/RegisterUserModal';
import EditUserModal from '../../components/modals/EditUserModal';
import { useUserTable } from '../../hooks/useUserTable';


// Render dash, if value is null
const renderValueOrDash = (params: GridRenderCellParams) => params.value ?? '-';

// Returns dash, if date is null
const renderDateOrDash = (params: GridRenderCellParams) =>
  params.value ? new Date(params.value).toLocaleDateString() : '-';

// Columns structure
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Imię', width: 130 },
  { field: 'lastName', headerName: 'Nazwisko', width: 130 },
  { field: 'role', headerName: 'Rodzaj konta', width: 130, },
  { field: 'status', headerName: 'Status', width: 130, },
  { field: 'address', headerName: 'Adres', width: 160, renderCell: renderValueOrDash },
  { field: 'apartmentNumber', headerName: 'Numer mieszkania', type: 'number', align: 'left', width: 140, renderCell: renderValueOrDash },
  { field: 'moveInDate', headerName: 'Data wprowadzenia', type: 'date', width: 160, renderCell: renderDateOrDash },
  { field: 'moveOutDate', headerName: 'Data wyprowadzenia', type: 'date', width: 160, renderCell: renderDateOrDash },
];

const UserManagementPanel: React.FC = () => {

  const {
    search,
    filteredRows,
    handleSearchChange,
  } = useUserTable();

  const [selectedRowId, setSelectedRowId] = React.useState<GridRowId | null>(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const selectedUser = filteredRows.find(row => row.id === selectedRowId) || null;

  return (
    <Paper sx={{ height: 800, width: '98%', marginTop: '1px', boxShadow:0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>

        <Stack direction="row" spacing={2}>

          {/* Search field */}
          <TextField
            size="small"
            label="Wyszukaj..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          {/* Edit user button */}
          <Button
            variant="outlined"
            disabled={!selectedRowId}
            onClick={() => setEditModalOpen(true)}
            >
            Edytuj
          </Button>

          {/* Edit user modal open */}
          <EditUserModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            userData={selectedUser}
          />

          {/* Add new user button */}
          <RegisterUserModal />

        </Stack>
      </Box>

      {/* Table */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        onRowClick={(params) => setSelectedRowId(params.id)}

        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 20 } } }}
        pageSizeOptions={[5, 10, 20, 30]}

        sx={{ border: 0 }}
      />
    </Paper>
  );

};

export default UserManagementPanel;
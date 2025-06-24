import React from 'react';
import { DataGrid, GridColDef, GridRowId, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Stack, Box, TextField, Autocomplete } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useUserTable } from '../../hooks/useUserTable';
import { UserRoles } from '../../types/User';
import EditResidentModal from '../../components/modals/EditResidentModal';
import EditManagerModal from '../../components/modals/EditManagerModal';
import EditTenantModal from '../../components/modals/EditTenantModal';
import ExpandableAddUserButton from '../../components/buttons/ExpandableAddUserButton';
import { UserRow } from '../../hooks/useUserTable';

// Render dash, if value is null
const renderValueOrDash = (params: GridRenderCellParams) => params.value ?? '-';

// Render date or dash
const renderDateOrDash = (params: GridRenderCellParams) => {
  if (!params.value) return '-';
  return new Date(params.value).toLocaleDateString('pl-PL');
};

const UserManagementPanel: React.FC = () => {
  const {
    search,
    filteredRows,
    handleSearchChange,
    loading,
    error
  } = useUserTable();

  const [selectedRowId, setSelectedRowId] = React.useState<GridRowId | null>(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  const handleOpenModal = (userId: GridRowId) => {
    setSelectedRowId(userId);
    setEditModalOpen(true);
  };

  const selectedUser = filteredRows.find(row => row.userId === selectedRowId);

  // Columns structure
  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'ID', width: 70 },
    { field: 'login', headerName: 'Login', width: 250 },
    { field: 'role', headerName: 'Rodzaj konta', width: 250 },
    { field: 'userStatus', headerName: 'Status', width: 250 },
    { field: 'address', headerName: 'Adres', width: 160, renderCell: renderValueOrDash },
    { field: 'apartmentNumber', headerName: 'Numer mieszkania', type: 'number', align: 'left', width: 140, renderCell: renderValueOrDash },
    { field: 'moveInDate', headerName: 'Data wprowadzenia', type: 'date', width: 160, renderCell: renderDateOrDash },
    { field: 'moveOutDate', headerName: 'Data wyprowadzenia', type: 'date', width: 160, renderCell: renderDateOrDash },
  ];

  return (
    <Paper sx={{ height: 800, width: '98%', marginTop: '1px', boxShadow: 0 }}>
      {/* Search field at the top left */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <TextField
          size="small"
          label="Wyszukaj..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{ minWidth: 300 }}
        />
      </Box>
      {/* Controls row: dropdown, edit, add */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <Autocomplete
            options={filteredRows}
            getOptionLabel={(user) => `${user.login} (${user.role})`}
            onChange={(_, val) => setSelectedRowId(val?.userId || null)}
            value={selectedUser || null}
            renderInput={(params) => <TextField {...params} label="Wybierz użytkownika" variant="outlined" sx={{ width: 350 }} />}
          />
          <Button 
            variant="outlined" 
            disabled={!selectedUser} 
            onClick={() => handleOpenModal(selectedUser?.userId || '')}
          >
            Edytuj
          </Button>
          <ExpandableAddUserButton />
        </Stack>
      </Box>

      {/* Edit user modals - rendered outside Stack */}
      {selectedUser && editModalOpen && (() => {
        switch (selectedUser.role) {
          case UserRoles.RESIDENT:
            return <EditResidentModal open={editModalOpen} onClose={() => setEditModalOpen(false)} userData={selectedUser as any} />;
          case UserRoles.MANAGER:
            return <EditManagerModal open={editModalOpen} onClose={() => setEditModalOpen(false)} userData={selectedUser as any} />;
          case UserRoles.TENANT:
            return <EditTenantModal open={editModalOpen} onClose={() => setEditModalOpen(false)} userData={selectedUser as any} />;
          default:
            return null;
        }
      })()}

      {/* Table */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.userId}
        onRowClick={(params) => setSelectedRowId(params.id)}
        loading={loading}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 20 } } }}
        pageSizeOptions={[5, 10, 20, 30]}
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            color: '#222',
            fontWeight: 'bold',
          },
        }}
      />
    </Paper>
  );
};

export default UserManagementPanel;
import React from 'react';
import { DataGrid, GridColDef, GridRowId, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Stack, Box, TextField } from '@mui/material';
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

// Returns dash, if date is null
const renderDateOrDash = (params: GridRenderCellParams) =>
  params.value ? new Date(params.value).toLocaleDateString() : '-';

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
    {
      field: 'actions',
      headerName: '',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="text"
          size="small"
          onClick={() => handleOpenModal(params.row.userId)}
        >
          Szczegóły
        </Button>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 800, width: '98%', marginTop: '1px', boxShadow: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Stack direction="row" spacing={2}>
          {/* Search field */}
          <TextField
            size="small"
            label="Wyszukaj..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          {/* Add new user button */}
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
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default UserManagementPanel;
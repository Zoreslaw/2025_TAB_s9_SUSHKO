import React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Button, Stack, Box, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import RegisterResidentModal from '../../components/modals/RegisterResidentModal';
import EditUserModal from '../../components/modals/EditUserModal';
import { useUserTable } from '../../contexts/UserTableContext';
import ExpandableAddUserButton from "../../components/buttons/ExpandableAddUserButton";

// Columns structure
const columns: GridColDef[] = [
  { field: 'userId', headerName: 'ID', width: 70 },
  { field: 'login', headerName: 'Login', width: 250 },
  { field: 'role', headerName: 'Rodzaj konta', width: 250, },
  { field: 'userStatus', headerName: 'Status', width: 250, },
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
          //onClick={() => setDetailsUserId(params.row.userId)}
        >
          Szczegóły
        </Button>
      ),
  },
];

const UserManagementPanel: React.FC = () => {

  const {
    search,
    filteredRows,
    handleSearchChange,
  } = useUserTable();

  const [selectedRowId, setSelectedRowId] = React.useState<GridRowId | null>(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const selectedUser = filteredRows.find(row => row.userId === selectedRowId) || null;

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
          {/* <Button
            variant="outlined"
            disabled={!selectedRowId}
            onClick={() => setEditModalOpen(true)}
            >
            Edytuj
          </Button> */}

          {/* Edit user modal open */}
          {/* <EditUserModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            userData={selectedUser}
          /> */}

          {/* Add new user button */}
          {/* <RegisterResidentModal /> */}

          {/* Add new user button */}
          <ExpandableAddUserButton />



        </Stack>
      </Box>

      {/* Table */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.userId}
        onRowClick={(params) => setSelectedRowId(params.id)}

        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 20 } } }}
        pageSizeOptions={[5, 10, 20, 30]}

        sx={{ border: 0 }}
      />
    </Paper>
  );

};

export default UserManagementPanel;
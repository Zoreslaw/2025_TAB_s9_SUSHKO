import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Edit as EditIcon,
  Assignment as AssignIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useIssues } from '../../hooks/useIssues';
import { useOrders } from '../../hooks/useOrders';
import { useUserTable } from '../../hooks/useUserTable';
import { Issue } from '../../types/Issue';
import { OrderStatus } from '../../types/Order';
import { User, UserRoles } from '../../types/User';
import { ApiIssue } from '../../services/api';
import { apiService } from '../../services/api';

const ManagerIssuesPage: React.FC = () => {
  const { issues, updateIssue } = useIssues();
  const { createOrder } = useOrders();
  const { filteredRows } = useUserTable();
  const users: User[] = (filteredRows as any[]).map((row: any) => ({
    userId: row.userId?.toString() ?? '',
    login: row.login ?? '',
    password: '',
    avatarUrl: row.avatarUrl ?? '',
    role: row.role ?? '',
    userStatus: row.userStatus ?? '',
    userCreationDate: new Date(),
  }));
  const managers: User[] = users.filter((user: User) => user.role === UserRoles.MANAGER);
  
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [orderData, setOrderData] = useState({
    cost: 0,
    contractor: '',
    orderDescription: '',
  });

  const handleAssignOperator = async () => {
    if (selectedIssue && selectedOperator) {
      try {
        await apiService.assignOperatorToIssue(Number(selectedIssue.issueId), Number(selectedOperator));
        setAssignDialogOpen(false);
        setSelectedIssue(null);
        setSelectedOperator('');
      } catch (error) {
        console.error('Failed to assign operator:', error);
      }
    }
  };

  const handleChangeStatus = async (issueId: string, status: string) => {
    try {
      await apiService.updateIssueStatus(Number(issueId), status);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleCreateOrder = async () => {
    if (selectedIssue && orderData.cost > 0 && orderData.contractor && orderData.orderDescription) {
      try {
        await createOrder({
          issueId: selectedIssue.issueId,
          cost: orderData.cost,
          contractor: orderData.contractor,
          orderDescription: orderData.orderDescription,
        });
        setOrderDialogOpen(false);
        setSelectedIssue(null);
        setOrderData({ cost: 0, contractor: '', orderDescription: '' });
      } catch (error) {
        console.error('Failed to create order:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'assigned': return 'info';
      case 'in_progress': return 'primary';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Oczekujące';
      case 'assigned': return 'Przypisane';
      case 'in_progress': return 'W realizacji';
      case 'resolved': return 'Rozwiązane';
      default: return status;
    }
  };

  const convertApiIssueToIssue = (apiIssue: ApiIssue): Issue => ({
    issueId: apiIssue.issueId.toString(),
    issuerId: apiIssue.issuerId.toString(),
    operatorId: apiIssue.operatorId !== undefined && apiIssue.operatorId !== null ? apiIssue.operatorId.toString() : undefined,
    description: apiIssue.issueDescription,
    status: apiIssue.issueStatus as any,
    type: apiIssue.issueType as any,
    creationDate: new Date(apiIssue.issueCreationDate),
    updateDate: apiIssue.issueUpdateDate ? new Date(apiIssue.issueUpdateDate) : undefined,
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Zarządzanie Zgłoszeniami
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Opis</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data utworzenia</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.issueId}>
                <TableCell>{issue.issueId}</TableCell>
                <TableCell>{issue.issueDescription}</TableCell>
                <TableCell>{issue.issueType}</TableCell>
                <TableCell>
                  <Select
                    value={issue.issueStatus}
                    onChange={e => handleChangeStatus(String(issue.issueId), e.target.value as string)}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="pending">Oczekujące</MenuItem>
                    <MenuItem value="in_progress">W realizacji</MenuItem>
                    <MenuItem value="resolved">Rozwiązane</MenuItem>
                    <MenuItem value="cancelled">Anulowane</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  {new Date(issue.issueCreationDate).toLocaleDateString('pl-PL')}
                </TableCell>
                <TableCell>
                  {issue.operatorId !== undefined && issue.operatorId !== null ?
                    users.find((u: User) => u.userId === String(issue.operatorId))?.login || 'Nieznany'
                    : 'Nieprzypisany'
                  }
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedIssue(convertApiIssueToIssue(issue));
                      setAssignDialogOpen(true);
                    }}
                    disabled={issue.issueStatus === 'resolved'}
                  >
                    <AssignIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedIssue(convertApiIssueToIssue(issue));
                      setOrderDialogOpen(true);
                    }}
                    disabled={issue.issueStatus === 'resolved'}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Assign Operator Dialog */}
      <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)}>
        <DialogTitle>Przypisz operatora</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Operator</InputLabel>
            <Select
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value as string)}
            >
              {managers.map((manager: User) => (
                <MenuItem key={manager.userId} value={manager.userId}>
                  {manager.login}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)}>Anuluj</Button>
          <Button onClick={handleAssignOperator} variant="contained">
            Przypisz
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Order Dialog */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Utwórz zlecenie naprawy</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Koszt (zł)"
            type="number"
            value={orderData.cost}
            onChange={(e) => setOrderData({ ...orderData, cost: parseFloat(e.target.value) || 0 })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Wykonawca"
            value={orderData.contractor}
            onChange={(e) => setOrderData({ ...orderData, contractor: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Opis zlecenia"
            multiline
            rows={3}
            value={orderData.orderDescription}
            onChange={(e) => setOrderData({ ...orderData, orderDescription: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>Anuluj</Button>
          <Button onClick={handleCreateOrder} variant="contained">
            Utwórz zlecenie
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerIssuesPage; 
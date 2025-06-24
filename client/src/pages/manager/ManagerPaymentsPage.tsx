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
  CheckCircle as ApproveIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { usePayments } from '../../hooks/usePayments';
import { ApiPayment } from '../../services/api';

const ManagerPaymentsPage: React.FC = () => {
  const { payments, updatePayment } = usePayments();
  
  const [selectedPayment, setSelectedPayment] = useState<ApiPayment | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    paymentAmount: 0,
    paymentDescription: '',
    paymentStatus: 'pending',
  });

  const handleUpdatePayment = async (): Promise<void> => {
    if (selectedPayment) {
      try {
        await updatePayment(selectedPayment.paymentId, editData);
        setEditDialogOpen(false);
        setSelectedPayment(null);
      } catch (error) {
        console.error('Failed to update payment:', error);
      }
    }
  };

  const handleApprovePayment = async (payment: ApiPayment): Promise<void> => {
    try {
      await updatePayment(payment.paymentId, { paymentStatus: 'approved' });
    } catch (error) {
      console.error('Failed to approve payment:', error);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'paid': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'pending': return 'Oczekujące';
      case 'approved': return 'Zatwierdzone';
      case 'rejected': return 'Odrzucone';
      case 'paid': return 'Opłacone';
      default: return status;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Zarządzanie Płatnościami
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Opis</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data płatności</TableCell>
              <TableCell>Zatwierdzający</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment: ApiPayment) => (
              <TableRow key={payment.paymentId}>
                <TableCell>{payment.paymentId}</TableCell>
                <TableCell>{payment.paymentDescription}</TableCell>
                <TableCell>{payment.paymentAmount.toFixed(2)} zł</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(payment.paymentStatus)}
                    color={getStatusColor(payment.paymentStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(payment.paymentDate).toLocaleDateString('pl-PL')}
                </TableCell>
                <TableCell>
                  {payment.approverId ? `ID: ${payment.approverId}` : 'Brak'}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedPayment(payment as any);
                      setViewDialogOpen(true);
                    }}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedPayment(payment as any);
                      setEditData({
                        paymentAmount: payment.paymentAmount,
                        paymentDescription: payment.paymentDescription,
                        paymentStatus: payment.paymentStatus,
                      });
                      setEditDialogOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  {payment.paymentStatus === 'pending' && (
                    <IconButton
                      onClick={() => handleApprovePayment(payment as any)}
                      color="success"
                    >
                      <ApproveIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Payment Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Szczegóły płatności</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>ID:</strong> {selectedPayment.paymentId}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Opis:</strong> {selectedPayment.paymentDescription}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Kwota:</strong> {selectedPayment.paymentAmount.toFixed(2)} zł
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Status:</strong> {getStatusLabel(selectedPayment.paymentStatus)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Data:</strong> {new Date(selectedPayment.paymentDate).toLocaleDateString('pl-PL')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Zatwierdzający:</strong> {selectedPayment.approverId || 'Brak'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Zamknij</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Payment Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edytuj płatność</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Kwota (zł)"
            type="number"
            value={editData.paymentAmount}
            onChange={(e) => setEditData({ ...editData, paymentAmount: parseFloat(e.target.value) || 0 })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Opis"
            value={editData.paymentDescription}
            onChange={(e) => setEditData({ ...editData, paymentDescription: e.target.value })}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={editData.paymentStatus}
              onChange={(e) => setEditData({ ...editData, paymentStatus: e.target.value })}
            >
              <MenuItem value="pending">Oczekujące</MenuItem>
              <MenuItem value="approved">Zatwierdzone</MenuItem>
              <MenuItem value="rejected">Odrzucone</MenuItem>
              <MenuItem value="paid">Opłacone</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Anuluj</Button>
          <Button onClick={handleUpdatePayment} variant="contained">
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerPaymentsPage; 
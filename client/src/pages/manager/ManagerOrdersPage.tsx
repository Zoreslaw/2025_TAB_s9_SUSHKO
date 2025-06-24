import React, { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  CheckCircle as CompleteIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useOrders } from '../../hooks/useOrders';
import { usePayments } from '../../hooks/usePayments';
import { apiService } from '../../services/api';
import { Order, OrderStatus } from '../../types/Order';

const ManagerOrdersPage: React.FC = () => {
  const { orders, updateOrder, fetchOrders } = useOrders();
  const { payments, fetchPayments } = usePayments();
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    cost: 0,
    contractor: '',
    orderDescription: '',
    orderStatus: 'pending' as OrderStatus,
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  // Get orders that have payments
  const ordersWithPayments = new Set(
    payments
      .filter(payment => payment.orderId)
      .map(payment => payment.orderId)
  );

  // Fetch payments when component mounts
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleUpdateOrder = async () => {
    if (selectedOrder) {
      try {
        await updateOrder(selectedOrder.orderId, editData);
        setEditDialogOpen(false);
        setSelectedOrder(null);
      } catch (error) {
        console.error('Failed to update order:', error);
      }
    }
  };

  const handleCompleteOrder = async (order: Order) => {
    try {
      await updateOrder(order.orderId, { orderStatus: 'completed' });
    } catch (error) {
      console.error('Failed to complete order:', error);
    }
  };

  const handleCreatePayment = async (order: Order) => {
    try {
      await apiService.createPaymentFromOrder(order.orderId, 1);
      setSnackbar({ open: true, message: 'Płatność została utworzona.', severity: 'success' });
      // Refresh payments to update the UI
      await fetchPayments();
    } catch (error: any) {
      setSnackbar({ open: true, message: error.message || 'Błąd podczas tworzenia płatności.', severity: 'error' });
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'Oczekujące';
      case 'in_progress': return 'W realizacji';
      case 'completed': return 'Zakończone';
      case 'cancelled': return 'Anulowane';
      default: return status;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Zarządzanie Zleceniami
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Zgłoszenie</TableCell>
              <TableCell>Opis</TableCell>
              <TableCell>Wykonawca</TableCell>
              <TableCell>Koszt</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data utworzenia</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>#{order.issueId}</TableCell>
                <TableCell>{order.orderDescription}</TableCell>
                <TableCell>{order.contractor}</TableCell>
                <TableCell>{order.cost.toFixed(2)} zł</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(order.orderStatus)}
                    color={getStatusColor(order.orderStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(order.orderCreationDate).toLocaleDateString('pl-PL')}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedOrder(order);
                      setEditData({
                        cost: order.cost,
                        contractor: order.contractor,
                        orderDescription: order.orderDescription,
                        orderStatus: order.orderStatus,
                      });
                      setEditDialogOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  {order.orderStatus !== 'completed' && (
                    <IconButton
                      onClick={() => handleCompleteOrder(order)}
                      color="success"
                    >
                      <CompleteIcon />
                    </IconButton>
                  )}
                  {order.orderStatus === 'completed' && !ordersWithPayments.has(order.orderId) && (
                    <IconButton
                      onClick={() => handleCreatePayment(order)}
                      color="primary"
                    >
                      <PaymentIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Order Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edytuj zlecenie</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Koszt (zł)"
            type="number"
            value={editData.cost}
            onChange={(e) => setEditData({ ...editData, cost: parseFloat(e.target.value) || 0 })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Wykonawca"
            value={editData.contractor}
            onChange={(e) => setEditData({ ...editData, contractor: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Opis zlecenia"
            multiline
            rows={3}
            value={editData.orderDescription}
            onChange={(e) => setEditData({ ...editData, orderDescription: e.target.value })}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={editData.orderStatus}
              onChange={(e) => setEditData({ ...editData, orderStatus: e.target.value as OrderStatus })}
            >
              <MenuItem value="pending">Oczekujące</MenuItem>
              <MenuItem value="in_progress">W realizacji</MenuItem>
              <MenuItem value="completed">Zakończone</MenuItem>
              <MenuItem value="cancelled">Anulowane</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Anuluj</Button>
          <Button onClick={handleUpdateOrder} variant="contained">
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManagerOrdersPage; 
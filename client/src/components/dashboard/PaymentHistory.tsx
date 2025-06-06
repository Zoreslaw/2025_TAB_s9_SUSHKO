import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  TablePagination,
  alpha,
  useTheme
} from '@mui/material';
import { Payment as PaymentIcon, CheckCircle, ErrorOutline, WatchLater } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { apiService, ApiPayment } from '../../services/api';

const PaymentHistory: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [payments, setPayments] = useState<ApiPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await apiService.getPayments();
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };
  
  const getPaymentTypeText = (description: string) => {
    if (description.toLowerCase().includes('czynsz')) return 'Czynsz';
    if (description.toLowerCase().includes('media')) return 'Media';
    if (description.toLowerCase().includes('woda')) return 'Opłata za wodę';
    if (description.toLowerCase().includes('zaległ')) return 'Zaległe płatności';
    return 'Inne';
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle fontSize="small" />;
      case 'pending':
        return <WatchLater fontSize="small" />;
      case 'overdue':
        return <ErrorOutline fontSize="small" />;
      default:
        return <WatchLater fontSize="small" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Opłacona';
      case 'pending':
        return 'Oczekująca';
      case 'overdue':
        return 'Zaległa';
      case 'cancelled':
        return 'Anulowana';
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string): "success" | "warning" | "error" | "default" | "primary" => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      case 'cancelled':
        return 'default';
      default:
        return 'primary';
    }
  };
  
  const getRowBackground = (status: string, index: number) => {
    const isEven = index % 2 === 0;
    
    switch (status) {
      case 'overdue':
        return alpha(theme.palette.error.light, 0.1);
      case 'pending':
        return isEven ? alpha(theme.palette.warning.light, 0.05) : alpha(theme.palette.warning.light, 0.02);
      default:
        return isEven ? alpha(theme.palette.action.hover, 0.05) : 'transparent';
    }
  };
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Sort payments by date
  const sortedPayments = [...payments].sort((a, b) => 
    new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
  );
  
  const slicedPayments = sortedPayments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Ładowanie historii płatności...</Typography>
      </Box>
    );
  }
  
  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 1
      }}>
        <PaymentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
        <Typography variant="h6" component="h2" color="primary" fontWeight="bold">
          Historia Płatności
        </Typography>
      </Box>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TableContainer 
          sx={{ 
            borderRadius: 2,
            boxShadow: 'none',
            border: `1px solid ${theme.palette.divider}`,
            mb: 1,
            '&::-webkit-scrollbar': {
              height: '8px',
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.grey[100],
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.grey[400],
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: theme.palette.grey[500],
              },
            },
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="payment history table">
            <TableHead>
              <TableRow sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '& th': { 
                  fontWeight: 'bold',
                  color: theme.palette.text.primary
                }
              }}>
                <TableCell>Data wpłaty</TableCell>
                <TableCell>Opis</TableCell>
                <TableCell>Rodzaj opłaty</TableCell>
                <TableCell align="right">Kwota</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedPayments.map((payment, index) => (
                <motion.tr
                  key={payment.paymentId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    display: 'table-row',
                    backgroundColor: getRowBackground(payment.paymentStatus, index)
                  }}
                >
                  <TableCell component="th" scope="row">
                    {formatDate(payment.paymentDate)}
                  </TableCell>
                  <TableCell>
                    {payment.paymentDescription}
                  </TableCell>
                  <TableCell>{getPaymentTypeText(payment.paymentDescription)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {formatAmount(payment.paymentAmount)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={getStatusIcon(payment.paymentStatus)}
                      label={getStatusText(payment.paymentStatus)}
                      color={getStatusColor(payment.paymentStatus)}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        '& .MuiChip-label': { 
                          px: 1,
                          fontWeight: 500 
                        }
                      }}
                    />
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 2
        }}>
          <Typography variant="caption" color="text.secondary">
            Wyświetlanie {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, payments.length)} z {payments.length} płatności
          </Typography>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={payments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Wierszy na stronę:"
            labelDisplayedRows={() => ''}
            sx={{ 
              '& .MuiTablePagination-toolbar': { pr: 0 },
              '& .MuiTablePagination-selectLabel': { m: 0 }
            }}
          />
        </Box>
      </motion.div>
    </>
  );
};

export default PaymentHistory; 
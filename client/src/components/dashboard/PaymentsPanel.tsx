import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Badge, Chip, Divider } from '@mui/material';
import { PaymentRounded, AccessTime, PriorityHigh } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { apiService, ApiPayment } from '../../services/api';

const PaymentsPanel: React.FC = () => {
  const [payments, setPayments] = useState<ApiPayment[]>([]);
  const [loading, setLoading] = useState(true);

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

  const pendingPayments = payments.filter(
    payment => payment.paymentStatus === 'pending' || payment.paymentStatus === 'overdue'
  );
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount);
  };
  
  // Calculate total outstanding amount
  const totalOutstanding = pendingPayments.reduce((total, payment) => total + payment.paymentAmount, 0);
  
  return (
    <Box sx={{ height: '100%', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" alignItems="center" mb={1}>
        <PaymentRounded sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          Płatności
        </Typography>
      </Box>
      
      {pendingPayments.length > 0 && (
        <Box sx={{ mb: 2, p: 1, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">Łączna zaległa kwota:</Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {formatAmount(totalOutstanding)}
            </Typography>
          </Box>
        </Box>
      )}
      
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          pr: 1,
          pb: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.5)',
            },
          },
        }}
      >
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Zaległe płatności
        </Typography>
        
        {loading ? (
          <Typography variant="body2">Ładowanie płatności...</Typography>
        ) : pendingPayments.length > 0 ? (
          pendingPayments.map((payment, index) => (
            <motion.div
              key={payment.paymentId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  mt: 1, 
                  mb: 1,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: 'rgba(0, 0, 0, 0.1)',
                  border: payment.paymentStatus === 'overdue' ? '1px solid rgba(255, 87, 34, 0.5)' : 'none'
                }}
              >
                <Box sx={{ maxWidth: '60%' }}>
                  <Box display="flex" alignItems="center">
                    {payment.paymentStatus === 'overdue' && (
                      <PriorityHigh sx={{ mr: 0.5, color: 'error.light', fontSize: 16 }} />
                    )}
                    <Typography variant="subtitle2" sx={{ wordBreak: 'break-word', fontWeight: 600 }}>
                      {payment.paymentDescription}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                    <Typography variant="caption">
                      Data: {new Date(payment.paymentDate).toLocaleDateString('pl-PL')}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ minWidth: '40%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography fontWeight="bold">
                    {formatAmount(payment.paymentAmount)}
                  </Typography>
                  <Chip 
                    label={payment.paymentStatus === 'overdue' ? "Zaległa" : "Oczekująca"} 
                    size="small"
                    color={payment.paymentStatus === 'overdue' ? "error" : "warning"}
                    sx={{ 
                      fontSize: '0.7rem',
                      height: 20,
                      color: 'white',
                      bgcolor: payment.paymentStatus === 'overdue' ? 'error.main' : 'warning.main'
                    }}
                  />
                </Box>
              </Box>
              {index < pendingPayments.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              )}
            </motion.div>
          ))
        ) : (
          <Typography variant="body2">Brak zaległych płatności</Typography>
        )}
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="contained" 
            color="primary"
            fullWidth
            sx={{ 
              borderRadius: 8,
              bgcolor: 'white',
              color: 'secondary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            <Badge badgeContent={pendingPayments.length} color="error" sx={{ mr: 1 }}>
              <PaymentRounded />
            </Badge>
            Opłać teraz
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default PaymentsPanel; 
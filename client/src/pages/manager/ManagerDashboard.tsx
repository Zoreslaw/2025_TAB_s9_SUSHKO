import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  BugReport as IssuesIcon,
  Assignment as OrdersIcon,
  Payment as PaymentsIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useIssues } from '../../hooks/useIssues';
import { useOrders } from '../../hooks/useOrders';
import { usePayments } from '../../hooks/usePayments';
import { useNotifications } from '../../hooks/useNotifications';

const ManagerDashboard: React.FC = () => {
  const { issues } = useIssues();
  const { orders } = useOrders();
  const { payments } = usePayments();
  const { notifications, getUnreadCount } = useNotifications();

  const pendingIssues = issues.filter(issue => issue.issueStatus === 'pending');
  const inProgressOrders = orders.filter(order => order.orderStatus === 'in_progress');
  const pendingPayments = payments.filter(payment => payment.paymentStatus === 'pending');
  const unreadNotifications = getUnreadCount();

  const stats = [
    {
      title: 'Oczekujące zgłoszenia',
      value: pendingIssues.length,
      total: issues.length,
      icon: <IssuesIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning',
    },
    {
      title: 'Zlecenia w realizacji',
      value: inProgressOrders.length,
      total: orders.length,
      icon: <OrdersIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      color: 'info',
    },
    {
      title: 'Oczekujące płatności',
      value: pendingPayments.length,
      total: payments.length,
      icon: <PaymentsIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success',
    },
    {
      title: 'Nieprzeczytane powiadomienia',
      value: unreadNotifications,
      total: notifications.length,
      icon: <NotificationsIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      color: 'error',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Panel Menedżera
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                
                {stat.total > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Postęp
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Math.round((stat.value / stat.total) * 100)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(stat.value / stat.total) * 100}
                      color={stat.color as any}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ostatnie zgłoszenia
              </Typography>
              {pendingIssues.slice(0, 5).map((issue) => (
                <Box key={issue.issueId} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {issue.issueDescription}
                  </Typography>
                  <Chip
                    label={issue.issueStatus}
                    size="small"
                    color="warning"
                    sx={{ mt: 1 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Aktywne zlecenia
              </Typography>
              {inProgressOrders.slice(0, 5).map((order) => (
                <Box key={order.orderId} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {order.orderDescription}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Chip
                      label={order.orderStatus}
                      size="small"
                      color="info"
                    />
                    <Typography variant="body2" fontWeight="bold">
                      {order.cost.toFixed(2)} zł
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagerDashboard; 
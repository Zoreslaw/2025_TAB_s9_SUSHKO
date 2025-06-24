import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { NotificationsActive, PriorityHigh, Info, CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationsPanel: React.FC = () => {
  const { notifications, loading } = useNotifications();

  const getNotificationIcon = (type: string, priority: string) => {
    if (priority === 'high') {
      return <PriorityHigh sx={{ fontSize: 16, color: 'error.light', mr: 0.5 }} />;
    }
    
    switch (type) {
      case 'issue_resolved':
        return <CheckCircle sx={{ fontSize: 16, color: 'success.light', mr: 0.5 }} />;
      case 'payment_overdue':
        return <PriorityHigh sx={{ fontSize: 16, color: 'error.light', mr: 0.5 }} />;
      case 'issue_pending':
        return <Info sx={{ fontSize: 16, color: 'warning.light', mr: 0.5 }} />;
      default:
        return <Info sx={{ fontSize: 16, color: 'info.light', mr: 0.5 }} />;
    }
  };

  const getNotificationBorder = (priority: string) => {
    return priority === 'high' ? '1px solid rgba(255, 87, 34, 0.5)' : 'none';
  };

  return (
    <Box sx={{ height: '100%', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" alignItems="center" mb={1}>
        <NotificationsActive sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          Powiadomienia
        </Typography>
      </Box>
      
      <List 
        sx={{ 
          flexGrow: 1,
          overflowY: 'auto',
          mt: 1,
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
        {loading ? (
          <Typography variant="body2">Ładowanie powiadomień...</Typography>
        ) : notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.notificationId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem 
                alignItems="flex-start" 
                sx={{ 
                  p: 1, 
                  borderRadius: 1, 
                  mb: 0.5, 
                  bgcolor: 'rgba(0,0,0,0.05)',
                  border: getNotificationBorder(notification.priority)
                }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      {getNotificationIcon(notification.type, notification.priority)}
                      <Typography variant="subtitle2" noWrap={false} sx={{ wordBreak: 'break-word', fontWeight: 600 }}>
                        {notification.title}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Box component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mb: 0.5 }}>
                        {new Date(notification.createdDate).toLocaleDateString('pl-PL')}
                      </Box>
                      <Typography component="span" variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', display: 'block', fontSize: '0.8rem' }}>
                        {notification.message}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && (
                <Divider component="li" sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
              )}
            </motion.div>
          ))
        ) : (
          <Typography variant="body2">Brak nowych powiadomień</Typography>
        )}
      </List>
    </Box>
  );
};

export default NotificationsPanel; 
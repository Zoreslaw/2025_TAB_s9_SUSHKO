import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationIcon,
  BugReport as IssueIcon,
  Assignment as OrderIcon,
  Payment as PaymentIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNotifications } from '../../hooks/useNotifications';
import { Notification, NotificationType } from '../../types/Notification';

const ManagerNotificationsPage: React.FC = () => {
  const { notifications, markAsRead, deleteNotification } = useNotifications();

  const handleMarkAsRead = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await markAsRead(notification.notificationId);
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await deleteNotification(notificationId);
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'issue': return <IssueIcon />;
      case 'order': return <OrderIcon />;
      case 'payment': return <PaymentIcon />;
      default: return <InfoIcon />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case 'issue': return 'Zgłoszenie';
      case 'order': return 'Zlecenie';
      case 'payment': return 'Płatność';
      case 'general': return 'Ogólne';
      default: return type;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Powiadomienia
        </Typography>
        <Chip
          label={`${notifications.filter(n => !n.isRead).length} nieprzeczytane`}
          color="primary"
        />
      </Box>

      <Paper>
        <List>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="Brak powiadomień"
                secondary="Nie masz żadnych powiadomień"
              />
            </ListItem>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.notificationId}>
                <ListItem
                  sx={{
                    backgroundColor: notification.isRead ? 'transparent' : 'action.hover',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  }}
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: notification.isRead ? 'normal' : 'bold',
                          }}
                        >
                          {notification.title}
                        </Typography>
                        <Chip
                          label={getTypeLabel(notification.type)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={notification.priority}
                          size="small"
                          color={getPriorityColor(notification.priority) as any}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.createdDate).toLocaleString('pl-PL')}
                        </Typography>
                      </Box>
                    }
                    onClick={() => handleMarkAsRead(notification)}
                    sx={{ cursor: 'pointer' }}
                  />
                  <IconButton
                    onClick={() => handleDeleteNotification(notification.notificationId)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default ManagerNotificationsPage; 
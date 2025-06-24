import { useState, useEffect } from 'react';
import { apiService, convertRoleToEnglish } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.userId) {
        setNotifications([]);
        return;
      }

      const userId = parseInt(user.userId);
      const userRole = convertRoleToEnglish(user.role);
      
      const data = await apiService.getNotifications(userId, userRole);
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.userId]);

  const createNotification = async (notificationData: any) => {
    try {
      const newNotification = await apiService.createNotification(notificationData);
      setNotifications(prev => [...prev, newNotification]);
      return newNotification;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create notification');
      throw err;
    }
  };

  const updateNotification = async (id: number, notificationData: any) => {
    try {
      await apiService.updateNotification(id, notificationData);
      setNotifications(prev => prev.map(notification => 
        notification.notificationId === id ? { ...notification, ...notificationData } : notification
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notification');
      throw err;
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await apiService.markNotificationAsRead(id);
      setNotifications(prev => prev.map(notification => 
        notification.notificationId === id 
          ? { ...notification, isRead: true, readDate: new Date().toISOString() }
          : notification
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read');
      throw err;
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await apiService.deleteNotification(id);
      setNotifications(prev => prev.filter(notification => notification.notificationId !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete notification');
      throw err;
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    createNotification,
    updateNotification,
    markAsRead,
    deleteNotification,
    getUnreadCount,
  };
}; 
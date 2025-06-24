export interface Notification {
  notificationId: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  createdDate: Date;
  readDate?: Date;
  issueId?: number;
  orderId?: number;
  paymentId?: number;
}

export type NotificationType = 'issue' | 'payment' | 'order' | 'general';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface CreateNotificationRequest {
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  issueId?: number;
  orderId?: number;
  paymentId?: number;
}

export interface UpdateNotificationRequest {
  isRead?: boolean;
  readDate?: Date;
} 
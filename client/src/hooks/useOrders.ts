import { useState, useEffect } from 'react';
import { apiService, convertRoleToEnglish } from '../services/api';
import { Order } from '../types/Order';
import { useAuth } from '../contexts/AuthContext';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.userId) {
        setOrders([]);
        return;
      }

      const userId = parseInt(user.userId);
      const userRole = convertRoleToEnglish(user.role);
      
      const apiOrders = await apiService.getOrders(userId, userRole);
      const convertedOrders: Order[] = apiOrders.map(apiOrder => ({
        orderId: apiOrder.orderId,
        ordererId: apiOrder.ordererId,
        ordererName: apiOrder.ordererName,
        issueId: apiOrder.issueId,
        issueDescription: apiOrder.issueDescription,
        cost: apiOrder.cost,
        contractor: apiOrder.contractor,
        orderDescription: apiOrder.orderDescription,
        orderStatus: apiOrder.orderStatus as any,
        orderCreationDate: new Date(apiOrder.orderCreationDate),
        orderEndDate: apiOrder.orderEndDate ? new Date(apiOrder.orderEndDate) : undefined,
      }));
      setOrders(convertedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.userId]);

  const createOrder = async (orderData: any) => {
    try {
      setError(null);
      const newOrder = await apiService.createOrder(orderData);
      await fetchOrders(); // Refresh the list
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      throw err;
    }
  };

  const updateOrder = async (id: number, orderData: any) => {
    try {
      setError(null);
      await apiService.updateOrder(id, orderData);
      await fetchOrders(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order');
      throw err;
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      setError(null);
      await apiService.deleteOrder(id);
      await fetchOrders(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete order');
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
  };
}; 
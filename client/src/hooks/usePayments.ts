import { useState, useEffect } from 'react';
import { apiService, convertRoleToEnglish } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const usePayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.userId) {
        setPayments([]);
        return;
      }

      const userId = parseInt(user.userId);
      const userRole = convertRoleToEnglish(user.role);
      
      console.log('Fetching payments for user:', userId, 'with role:', userRole);
      
      const data = await apiService.getPayments(userId, userRole);
      console.log('Received payments:', data);
      
      setPayments(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user?.userId]);

  const createPayment = async (paymentData: any) => {
    try {
      const newPayment = await apiService.createPayment(paymentData);
      setPayments(prev => [...prev, newPayment]);
      return newPayment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create payment');
      throw err;
    }
  };

  const updatePayment = async (id: number, paymentData: any) => {
    try {
      await apiService.updatePayment(id, paymentData);
      setPayments(prev => prev.map(payment => 
        payment.paymentId === id ? { ...payment, ...paymentData } : payment
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment');
      throw err;
    }
  };

  const deletePayment = async (id: number) => {
    try {
      await apiService.deletePayment(id);
      setPayments(prev => prev.filter(payment => payment.paymentId !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete payment');
      throw err;
    }
  };

  return {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
    updatePayment,
    deletePayment,
  };
}; 
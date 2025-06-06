// hooks/useEditUserForm.ts
import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

export interface EditUserFormData {
  login: string;
  avatarUrl: string;
  role: string;
  userStatus: string;
}

export function useEditUserForm(userData: any, onClose: () => void) {
  const [form, setForm] = useState<EditUserFormData>({
    login: '',
    avatarUrl: '',
    role: '',
    userStatus: '',
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setForm({
        login: userData.login || '',
        avatarUrl: userData.avatarUrl || '',
        role: userData.role || 'resident',
        userStatus: userData.status || 'active',
      });
    }
  }, [userData]);

  const handleChange = (field: keyof EditUserFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleRoleChange = (role: string) => {
    setForm(prev => ({ ...prev, role }));
  };

  const handleStatusChange = (status: string) => {
    setForm(prev => ({ ...prev, userStatus: status }));
  };

  const handleClose = () => {
    setErrors({});
    setLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      setLoading(true);
      await apiService.updateUser(userData.id, {
        login: form.login,
        avatarUrl: form.avatarUrl || undefined,
        role: form.role,
        userStatus: form.userStatus,
      });
      
      handleClose();
      // Optionally trigger a refresh of the user list
      window.location.reload();
    } catch (error) {
      console.error('Failed to update user:', error);
      // Handle error (could set an error state to show to user)
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};

    if (!form.login.trim()) newErrors.login = true;
    if (!form.role.trim()) newErrors.role = true;
    if (!form.userStatus.trim()) newErrors.userStatus = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { 
    form, 
    errors, 
    loading,
    handleChange, 
    handleRoleChange,
    handleStatusChange,
    handleSubmit 
  };
}

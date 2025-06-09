import { useState } from 'react';
import { apiService } from '../services/api';

const initialForm = {
  login: '',
  password: '',
  avatarUrl: '',
  role: 'resident',
  status: 'active',
};

export function useRegisterUserForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setForm(prev => ({ ...prev, status }));
  };

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};

    if (!form.login.trim()) newErrors.login = true;
    if (!form.password.trim()) newErrors.password = true;
    if (!form.role.trim()) newErrors.role = true;
    if (!form.status.trim()) newErrors.status = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setErrors({});
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      setLoading(true);
      await apiService.createUser({
        login: form.login,
        password: form.password,
        avatarUrl: form.avatarUrl || undefined,
        role: form.role,
        userStatus: form.status,
      });
      
      handleClose();
      // Optionally trigger a refresh of the user list
      window.location.reload();
    } catch (error) {
      console.error('Failed to create user:', error);
      // Handle error (could set an error state to show to user)
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    form,
    errors,
    loading,
    handleChange,
    handleRoleChange,
    handleStatusChange,
    handleOpen,
    handleClose,
    handleSubmit,
    isFormValid,
  };
}

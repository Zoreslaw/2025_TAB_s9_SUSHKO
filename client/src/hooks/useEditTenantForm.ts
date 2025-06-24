import { useEffect, useState } from 'react';
import { User, UserStatus } from '../types/User';
import { Tenant } from '../types/Tenant';
import { apiService } from '../services/api';

export function useEditTenantForm(userData: Tenant, onClose: () => void, options?: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    userId: userData.userId,
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    userStatus: userData.userStatus || UserStatus.ACTIVE,
    email: userData.email || '',
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setForm({
      userId: userData.userId,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      userStatus: userData.userStatus || UserStatus.ACTIVE,
      email: userData.email || '',
    });
  }, [userData]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'status' 
      ? setForm((prev) => ({ ...prev, userStatus: e.target.value as UserStatus }))
      : e.target.value;

    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    window.location.reload()
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        await apiService.updateUser(Number(form.userId), form);
        handleClose();
        if (options?.onSuccess) {
          options.onSuccess();
        }
      } catch (error) {
        console.error('Failed to update tenant:', error);
      }
    }
  };

  // Name and email validation
  const validateName = (name: string) => /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s\-]+$/.test(name);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};

    if (!form.firstName || !validateName(form.firstName)) newErrors.firstName = true;
    if (!form.lastName || !validateName(form.lastName)) newErrors.lastName = true;
    if (form.email && !validateEmail(form.email)) newErrors.email = true;  
    if (!form.userStatus) newErrors.status = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { form, errors, handleClose, handleChange, handleSubmit };
}

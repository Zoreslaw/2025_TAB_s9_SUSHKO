import { useEffect, useState } from 'react';
import { User, UserStatus } from '../types/User';
import { apiService } from '../services/api';

export function useEditManagerForm(userData: User, onClose: () => void, options?: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    userId: userData.userId,
    userStatus: userData.userStatus || UserStatus.ACTIVE,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setForm({
      userId: userData.userId,
      userStatus: userData.userStatus || UserStatus.ACTIVE,
    });
  }, [userData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, userStatus: event.target.value as UserStatus }));
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
        console.error('Failed to update manager:', error);
        // Handle error appropriately
      }
    }
  };

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};
      
    if (!form.userStatus) newErrors.status = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { form, errors, handleChange, handleSubmit };
}

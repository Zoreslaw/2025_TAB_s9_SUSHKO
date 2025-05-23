import { useEffect, useState } from 'react';
import { User, UserStatus } from '../types/User';

export function useEditManagerForm(userData: User, onClose: () => void) {
  const [form, setForm] = useState({
    userStatus: UserStatus.ACTIVE,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setForm({
      userStatus: userData.userStatus,
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

  const handleSubmit = () => {
    if (isFormValid()) {

      handleClose();

      // Send data to DB
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

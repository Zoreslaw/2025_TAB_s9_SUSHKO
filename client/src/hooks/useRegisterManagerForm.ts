import { useState, useEffect } from 'react';
import { User } from "../types/User"

const initialForm = {
  status: '',
  login: '',
};

export function useRegisterManagerForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};
   
    if (!form.status) newErrors.status = true;
    if (!form.login) newErrors.login = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setErrors({});
    window.location.reload()
  };

  // Key for local storage
  const STORAGE_KEY = 'users';

  // Temporary solution
  const addUserToLocalStorage = (newUser: User) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const users = stored ? JSON.parse(stored) : [];

  const newId = users.length > 0 ? Math.max(...users.map((u: any) => u.id)) + 1 : 1;
  const parsedUser = {
    ...newUser,
    id: newId,
  };

  users.push(parsedUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    //addUserToLocalStorage(form);
    handleClose();

    // Send data to DB
  };

  return {
    form,
    errors,
    handleChange,
    handleClose,
    handleSubmit,
  };
}

// hooks/useEditUserForm.ts
import { useEffect, useState } from 'react';

export interface EditUserFormData {
  firstName: string;
  lastName: string;
  address: string;
  apartmentNumber: number;
  moveInDate: string;
  moveOutDate: string;
  status: string;
  role: string;
}

export function useEditUserForm(userData: any, onClose: () => void) {
  const [form, setForm] = useState<EditUserFormData>({
    firstName: '',
    lastName: '',
    address: '',
    apartmentNumber: 0,
    moveInDate: '',
    moveOutDate: '',
    status: '',
    role: '',
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const isResidentRole = (role: string) => role === 'Mieszkaniec' || role === 'Najemca';
  const isResident = isResidentRole(form.role);

  useEffect(() => {
    if (userData) {
      setForm({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        address: userData.address || null,
        apartmentNumber: userData.apartmentNumber || null,
        moveInDate: userData.moveInDate ? new Date(userData.moveInDate).toISOString().split('T')[0] : '',
        moveOutDate: userData.moveOutDate ? new Date(userData.moveOutDate).toISOString().split('T')[0] : '',
        status: userData.status || '',
        role: userData.role || 'Mieszkaniec',
      });
    }
  }, [userData]);

  const handleChange = (field: keyof EditUserFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'apartmentNumber'
      ? Math.max(0, parseInt(e.target.value) || 0)
      : e.target.value;

    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    window.location.reload()
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      
      // Temporary solution
      const updatedUser = {
      ...form,
      id: userData.id, 
      apartmentNumber: form.apartmentNumber ? Number(form.apartmentNumber) : null,
      moveInDate: form.moveInDate ? new Date(form.moveInDate) : null,
      moveOutDate: form.moveOutDate ? new Date(form.moveOutDate) : null,
      };
      
      const existingUsersJSON = localStorage.getItem('users');
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

      const updatedUsers = existingUsers.map((user: any) =>
      user.id === updatedUser.id ? updatedUser : user
      );

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      handleClose();

      // Send data to DB
    }
  };

  // Name and address validation
  const validateName = (name: string) => /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s\-]+$/.test(name);
  const validateAddress = (address: string) =>
    /^[A-Za-z0-9\s\.\,\-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(address);

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};

    if (!form.firstName || !validateName(form.firstName)) newErrors.firstName = true;
    if (!form.lastName || !validateName(form.lastName)) newErrors.lastName = true;
    if (isResident) {
      if (!form.address || !validateAddress(form.address)) newErrors.address = true;
      if (!form.apartmentNumber) newErrors.apartmentNumber = true;
      if (!form.moveInDate) newErrors.moveInDate = true;
    }
    if (!form.status) newErrors.status = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { form, errors, isResident, handleChange, handleSubmit };
}

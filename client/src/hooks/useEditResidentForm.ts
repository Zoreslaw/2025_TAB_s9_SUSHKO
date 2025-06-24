import { useEffect, useState } from 'react';
import { Resident } from '../types/Resident';
import { User, UserStatus } from '../types/User';
import { apiService } from '../services/api';

export function useEditResidentForm(userData: Resident, onClose: () => void, options?: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    userId: userData.userId,
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    address: userData.address || '',
    apartmentNumber: userData.apartmentNumber || '',
    moveInDate: userData.moveInDate || '',
    moveOutDate: userData.moveOutDate || '',
    userStatus: userData.userStatus || UserStatus.ACTIVE,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setForm({
      userId: userData.userId,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      address: userData.address || '',
      apartmentNumber: userData.apartmentNumber || '',
      moveInDate: userData.moveInDate || '',
      moveOutDate: userData.moveOutDate || '',
      userStatus: userData.userStatus || UserStatus.ACTIVE,
    });
  }, [userData]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'apartmentNumber'
      ? Math.max(0, parseInt(e.target.value) || 0)
      : field === 'status' 
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
        console.error('Failed to update resident:', error);
      }
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
    if (!form.address || !validateAddress(form.address)) newErrors.address = true;
    if (!form.apartmentNumber) newErrors.apartmentNumber = true;
    if (!form.moveInDate) newErrors.moveInDate = true;    
    if (!form.userStatus) newErrors.status = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { form, errors, handleClose, handleChange, handleSubmit };
}

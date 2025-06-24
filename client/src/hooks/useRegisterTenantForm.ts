import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const initialForm = {
  login: '',
  password: '',
  role: 'Najemca',
  firstName: '',
  lastName: '',
  buildingId: 0,
  apartmentNumber: '',
  moveInDate: '',
  moveOutDate: '',
  status: 'active'
};

const validateName = (name: string) => /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]{2,50}$/.test(name);
const validateBuilding = (buildingId: number) => buildingId > 0;

export function useRegisterTenantForm(options?: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loginManuallyChanged, setLoginManuallyChanged] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  // Auto-generate login
  useEffect(() => {
    const { firstName, lastName } = form;
    if (firstName && lastName && !loginManuallyChanged) {
      const initials = firstName[0]?.toLowerCase() + lastName[0]?.toLowerCase();
      const random = Math.floor(10000 + Math.random() * 90000);
      setForm(prev => ({ ...prev, login: `${initials}${random}` }));
    }
  }, [form.firstName, form.lastName, loginManuallyChanged]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    
    if (field === 'login') {
      setLoginManuallyChanged(true);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};

    if (!form.firstName || !validateName(form.firstName)) newErrors.firstName = true;
    if (!form.lastName || !validateName(form.lastName)) newErrors.lastName = true;
    if (!form.buildingId || !validateBuilding(form.buildingId)) newErrors.buildingId = true;
    if (!form.apartmentNumber) newErrors.apartmentNumber = true;
    if (!form.moveInDate) newErrors.moveInDate = true;
    if (!form.status) newErrors.status = true;
    if (!form.login) newErrors.login = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setErrors({});
    setLoginManuallyChanged(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setGeneratedPassword('');
    if (options?.onSuccess) {
      options.onSuccess();
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      // Generate a random password if not provided
      const password = form.password || generateRandomPassword();
      setGeneratedPassword(password);
      
      await apiService.registerResident({
        ...form,
        password,
        role: 'tenant'
      });
      
      handleClose();
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to register tenant:', error);
      // Handle error appropriately
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  return {
    form,
    errors,
    showSuccessModal,
    generatedPassword,
    handleChange,
    handleOpen,
    handleClose,
    handleSuccessModalClose,
    handleSubmit,
  };
}

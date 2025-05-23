import { useState, useEffect } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  status: '',
  login: '',
};

export function useRegisterTenantForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loginManuallyChanged, setLoginManuallyChanged] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

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

    if (field === 'apartmentNumber' && value && parseInt(value) < 0) return;

    setForm(prev => ({ ...prev, [field]: value }));

    if (['firstName', 'lastName'].includes(field)) {
      setLoginManuallyChanged(false);
    }
    if (field === 'login') {
      setLoginManuallyChanged(true);
    }
  };

  // Name and address validation
  const validateName = (name: string) => /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s\-]+$/.test(name);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};
   
    if (!form.firstName || !validateName(form.firstName)) newErrors.firstName = true;
    if (!form.lastName || !validateName(form.lastName)) newErrors.lastName = true;
    if (form.email && !validateEmail(form.email)) newErrors.email = true;  
    if (!form.status) newErrors.status = true;
    if (!form.login) newErrors.login = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setLoginManuallyChanged(false);
    setErrors({});
    window.location.reload()
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;


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

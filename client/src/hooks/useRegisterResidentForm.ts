import { useState, useEffect } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  address: null,
  apartmentNumber: '',
  moveInDate: '',
  moveOutDate: '',
  status: '',
  login: '',
  role: '',
};

export function useRegisterResidentForm() {
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
    }, [form.firstName, form.lastName, form.role, loginManuallyChanged]);

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
  const validateName = (name: string) =>
    /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s\-]+$/.test(name);
  const validateAddress = (address: string) =>
    /^[A-Za-z0-9\s\.\,\-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(address);

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};
   
    if (!form.firstName || !validateName(form.firstName)) newErrors.firstName = true;
    if (!form.lastName || !validateName(form.lastName)) newErrors.lastName = true;
    if (!form.address || !validateAddress(form.address)) newErrors.address = true;
    if (!form.apartmentNumber) newErrors.apartmentNumber = true;
    if (!form.moveInDate) newErrors.moveInDate = true;
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

  
  // Key for local storage
  const STORAGE_KEY = 'users';

  // Temporary solution
  const addUserToLocalStorage = (newUser: any) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const users = stored ? JSON.parse(stored) : [];

  const newId = users.length > 0 ? Math.max(...users.map((u: any) => u.id)) + 1 : 1;
  const parsedUser = {
    ...newUser,
    id: newId,
    apartmentNumber: newUser.apartmentNumber ? parseInt(newUser.apartmentNumber, 10) : null,
    moveInDate: newUser.moveInDate ? new Date(newUser.moveInDate) : null,
    moveOutDate: newUser.moveOutDate ? new Date(newUser.moveOutDate) : null,
  };

  users.push(parsedUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    addUserToLocalStorage(form);
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

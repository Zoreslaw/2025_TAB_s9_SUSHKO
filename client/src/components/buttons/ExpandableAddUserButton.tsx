import React, { useState } from 'react';
import { Button, Box, Fade } from '@mui/material';
import RegisterResidentModal from '../../components/modals/RegisterResidentModal';
import RegisterManagerModal from '../../components/modals/RegisterManagerModal';
import RegisterTenantModal from '../../components/modals/RegisterTenantModal';


export default function ExpandableAddUserButton() {
  const [showOptions, setShowOptions] = useState(false);
  const [openResidentModal, setOpenResidentModal] = useState(false);
  const [openManagerModal, setOpenManagerModal] = useState(false);
  const [openTenantrModal, setOpenTenantModal] = useState(false);

  return (
    <>
    <Box
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      sx={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <Button variant="contained">Dodaj</Button>

      <Fade in={showOptions}>
        <Box sx={{ ml: 1, display: 'flex', gap: 1 }}>
          <Button size="medium" variant="outlined" color="primary" onClick={() => setOpenResidentModal(true)}>
            Mieszkańca
          </Button>
          <Button size="medium" variant="outlined" color="primary" onClick={() => setOpenTenantModal(true)}>
            Najemcę
          </Button>
          <Button size="medium" variant="outlined" color="primary" onClick={() => setOpenManagerModal(true)}>
            Menadżera
          </Button>
        </Box>
      </Fade>
    </Box>

    <RegisterResidentModal open={openResidentModal} onClose={() => setOpenResidentModal(false)} />
    <RegisterTenantModal open={openTenantrModal} onClose={() => setOpenTenantModal(false)} />
    <RegisterManagerModal open={openManagerModal} onClose={() => setOpenManagerModal(false)} />
    </>
  );
}

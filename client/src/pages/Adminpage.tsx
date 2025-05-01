import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const App: React.FC = () => {
  const navigate = useNavigate();
 
   const handleNavigate = () => {
     navigate('/users');
   };
 
   return (
     <div>
       <Button variant="contained" color="primary" onClick={handleNavigate}>
        Users Panel
       </Button>
       
     </div>
   );
};

export default App;

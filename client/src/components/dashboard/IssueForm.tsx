import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  FormLabel, 
  Paper,
  Stack,
  useTheme
} from '@mui/material';
import { Send, Close, BugReport } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { IssueType } from '../../types/Issue';

interface IssueFormProps {
  onClose?: () => void;
  onSubmit?: (data: any) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ onClose, onSubmit }) => {
  const [issueType, setIssueType] = useState<IssueType>(IssueType.MAINTENANCE);
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const theme = useTheme();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the issue data
    const issueData = {
      type: issueType,
      description,
      creationDate: new Date()
    };
    
    // Handle the submission
    if (onSubmit) {
      onSubmit(issueData);
    }
    
    // Show success animation
    setFormSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setIssueType(IssueType.MAINTENANCE);
      setDescription('');
      setFormSubmitted(false);
      if (onClose) onClose();
    }, 2000);
  };
  
  return (
    <Paper 
      elevation={6} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        maxWidth: 500,
        mx: 'auto',
        backgroundColor: 'background.paper',
        boxShadow: theme => `0 8px 32px ${theme.palette.primary.main}30`,
        border: `1px solid ${theme.palette.divider}`,
        color: 'text.primary'
      }}
    >
      {formSubmitted ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 0, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <BugReport color="success" sx={{ fontSize: '4rem' }} />
          </motion.div>
          <Typography variant="h6" color="success.main" mt={2}>
            Zgłoszenie zostało wysłane pomyślnie!
          </Typography>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2" color="primary">
              Zgłoś problem
            </Typography>
            {onClose && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  size="small" 
                  onClick={onClose} 
                  color="primary"
                  sx={{ minWidth: 'auto', p: 0.5 }}
                >
                  <Close />
                </Button>
              </motion.div>
            )}
          </Box>
          
          <Stack spacing={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: 'text.secondary' }}>Wybierz typ problemu:</FormLabel>
              <RadioGroup
                row
                name="issueType"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as IssueType)}
              >
                <FormControlLabel 
                  value={IssueType.MAINTENANCE} 
                  control={<Radio color="primary" />} 
                  label="Problem z urządzeniem" 
                  sx={{ color: 'text.primary' }}
                />
                <FormControlLabel 
                  value={IssueType.PAYMENT} 
                  control={<Radio color="primary" />} 
                  label="Problem z płatnością" 
                  sx={{ color: 'text.primary' }}
                />
                <FormControlLabel 
                  value={IssueType.OTHER} 
                  control={<Radio color="primary" />} 
                  label="Inny" 
                  sx={{ color: 'text.primary' }}
                />
              </RadioGroup>
            </FormControl>
            
            <TextField
              label="Opisz szczegóły oraz ..."
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
              variant="outlined"
              placeholder="Opisz szczegółowo problem, podając lokalizację, czas wystąpienia oraz inne istotne informacje..."
              InputLabelProps={{
                sx: { color: 'text.secondary' }
              }}
              InputProps={{
                sx: { 
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.divider
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.light
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main
                  }
                }
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Zdjęcie lub plik (opcjonalnie)
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="text"
                  component="label"
                  color="primary"
                >
                  Dodaj plik
                  <input type="file" hidden />
                </Button>
              </motion.div>
            </Box>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<Send />}
                sx={{ borderRadius: 8 }}
              >
                Wyślij
              </Button>
            </motion.div>
          </Stack>
        </form>
      )}
    </Paper>
  );
};

export default IssueForm; 
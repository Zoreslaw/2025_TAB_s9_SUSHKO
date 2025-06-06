import React, { useState } from 'react';
import { Box, Modal, Fade, Backdrop, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import IssueForm from '../components/dashboard/IssueForm';

const Dashboard: React.FC = () => {
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const theme = useTheme();
  
  const handleOpenIssueModal = () => {
    setIssueModalOpen(true);
  };
  
  const handleCloseIssueModal = () => {
    setIssueModalOpen(false);
  };
  
  const handleSubmitIssue = (issueData: any) => {
    console.log('Issue submitted:', issueData);
    // Here you would typically send the data to an API
    // but since we're using mock data, we'll just log it
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        sx={{ 
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: theme => theme.palette.grey[100],
          py: 3
        }}
      >
        <DashboardLayout onReportIssue={handleOpenIssueModal} />
        
        {/* Issue Form Modal */}
        <Modal
          open={issueModalOpen}
          onClose={handleCloseIssueModal}
          closeAfterTransition
          slots={{
            backdrop: Backdrop,
          }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: {
                backgroundColor: alpha(theme.palette.background.default, 0.8),
                backdropFilter: 'blur(4px)'
              }
            },
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Fade in={issueModalOpen}>
            <Box sx={{ 
              outline: 'none',
              position: 'relative',
              maxWidth: '95%',
              maxHeight: '90vh',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: alpha(theme.palette.background.paper, 0.1),
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.3),
                },
              }
            }}>
              <IssueForm 
                onClose={handleCloseIssueModal}
                onSubmit={handleSubmitIssue}
              />
            </Box>
          </Fade>
        </Modal>
      </Box>
    </motion.div>
  );
};

export default Dashboard; 
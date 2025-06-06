import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import NotificationsPanel from './NotificationsPanel';
import PaymentsPanel from './PaymentsPanel';
import IssuesPanel from './IssuesPanel';
import PaymentHistory from './PaymentHistory';

const MotionPaper = motion(Paper);

interface DashboardLayoutProps {
  onReportIssue?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onReportIssue }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleExpand = (panel: string) => {
    setExpanded(expanded === panel ? null : panel);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          Panel Mieszkańca
        </Typography>
      </motion.div> */}
      
      <Grid container spacing={3}>
        {/* Notifications */}
        <Grid item xs={12} md={6} lg={4}>
          <MotionPaper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: { xs: 350, md: 320 },
              borderRadius: 2,
              overflow: 'hidden',
              background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            }}
          >
            <NotificationsPanel />
          </MotionPaper>
        </Grid>
        
        {/* Payments */}
        <Grid item xs={12} md={6} lg={4}>
          <MotionPaper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: { xs: 350, md: 320 },
              borderRadius: 2,
              overflow: 'hidden',
              background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            <PaymentsPanel />
          </MotionPaper>
        </Grid>
        
        {/* Issues */}
        <Grid item xs={12} md={6} lg={4}>
          <MotionPaper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: { xs: 350, md: 320 },
              borderRadius: 2,
              overflow: 'hidden',
              background: `linear-gradient(45deg, ${theme.palette.info.dark} 0%, ${theme.palette.info.main} 100%)`,
            }}
          >
            <IssuesPanel onReportIssue={onReportIssue} />
          </MotionPaper>
        </Grid>
        
        {/* Payment History */}
        <Grid item xs={12}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            elevation={2}
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <PaymentHistory />
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardLayout; 
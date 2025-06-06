import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip, LinearProgress, Divider } from '@mui/material';
import { BugReport, Add, CheckCircle, HourglassEmpty } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { apiService, ApiIssue } from '../../services/api';

interface IssuesPanelProps {
  onReportIssue?: () => void;
}

const IssuesPanel: React.FC<IssuesPanelProps> = ({ onReportIssue }) => {
  const [issues, setIssues] = useState<ApiIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await apiService.getIssues();
        setIssues(data);
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const activeIssues = issues.filter(
    issue => issue.issueStatus === 'pending' || issue.issueStatus === 'in_progress'
  );
  
  // Calculate statistics
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(issue => issue.issueStatus === 'resolved').length;
  const progressPercentage = totalIssues ? Math.round((resolvedIssues / totalIssues) * 100) : 0;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'error.main';
      case 'in_progress':
        return 'warning.main';
      case 'resolved':
        return 'success.main';
      case 'cancelled':
        return 'text.disabled';
      default:
        return 'primary.main';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Nowy';
      case 'in_progress':
        return 'W trakcie';
      case 'resolved':
        return 'Rozwiązany';
      case 'cancelled':
        return 'Anulowany';
      default:
        return status;
    }
  };
  
  const getTypeText = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'Usterka';
      case 'plumbing':
        return 'Hydraulika';
      case 'electrical':
        return 'Elektryka';
      case 'payment':
        return 'Płatność';
      case 'other':
        return 'Inne';
      default:
        return type;
    }
  };
  
  const handleReportIssueClick = () => {
    if (onReportIssue) {
      onReportIssue();
    }
  };
  
  return (
    <Box sx={{ height: '100%', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" alignItems="center" mb={1}>
        <BugReport sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          Zgłoszone problemy
        </Typography>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="body2">Rozwiązane zgłoszenia</Typography>
          <Typography variant="body2" fontWeight="bold">{resolvedIssues}/{totalIssues}</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progressPercentage} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'white'
            }
          }} 
        />
      </Box>
      
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          pr: 1,
          pb: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.5)',
            },
          },
        }}
      >
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Aktywne zgłoszenia
        </Typography>
        
        {loading ? (
          <Typography variant="body2">Ładowanie zgłoszeń...</Typography>
        ) : activeIssues.length > 0 ? (
          activeIssues.map((issue, index) => (
            <motion.div
              key={issue.issueId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  mt: 1,
                  mb: 1,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: 'rgba(0, 0, 0, 0.1)',
                  borderLeft: `3px solid ${getStatusColor(issue.issueStatus)}`
                }}
              >
                <Box sx={{ maxWidth: '65%' }}>
                  <Typography variant="subtitle2" sx={{ wordBreak: 'break-word', fontWeight: 600 }}>
                    {issue.issueDescription}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5} gap={1}>
                    <Chip 
                      label={getTypeText(issue.issueType)} 
                      size="small"
                      sx={{ 
                        fontSize: '0.6rem',
                        height: 16,
                        color: 'white'
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {new Date(issue.issueCreationDate).toLocaleDateString('pl-PL')}
                    </Typography>
                  </Box>
                </Box>
                {issue.issueStatus === 'in_progress' && (
                  <Chip 
                    icon={<HourglassEmpty fontSize="small" />}
                    label={getStatusText(issue.issueStatus)} 
                    size="small"
                    sx={{ 
                      fontSize: '0.7rem',
                      height: 20,
                      bgcolor: getStatusColor(issue.issueStatus),
                      color: 'white'
                    }}
                  />
                )}
                {issue.issueStatus === 'resolved' && (
                  <Chip 
                    icon={<CheckCircle fontSize="small" />}
                    label={getStatusText(issue.issueStatus)} 
                    size="small"
                    sx={{ 
                      fontSize: '0.7rem',
                      height: 20,
                      bgcolor: getStatusColor(issue.issueStatus),
                      color: 'white'
                    }}
                  />
                )}
                {issue.issueStatus === 'pending' && (
                  <Chip 
                    label={getStatusText(issue.issueStatus)} 
                    size="small"
                    sx={{ 
                      fontSize: '0.7rem',
                      height: 20,
                      bgcolor: getStatusColor(issue.issueStatus),
                      color: 'white'
                    }}
                  />
                )}
              </Box>
              {index < activeIssues.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              )}
            </motion.div>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', p: 2, opacity: 0.8 }}>
            <Typography variant="body2">Brak aktywnych zgłoszeń</Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
              Wszystkie problemy zostały rozwiązane
            </Typography>
          </Box>
        )}
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="contained" 
            startIcon={<Add />}
            fullWidth
            onClick={handleReportIssueClick}
            sx={{ 
              borderRadius: 8,
              bgcolor: 'white',
              color: 'info.main', 
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            Zgłoś problem
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default IssuesPanel; 
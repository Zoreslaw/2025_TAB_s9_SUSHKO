import React from 'react';
import { useIssues } from '../../hooks/useIssues';
import IssueForm from './IssueForm';

interface IssueFormWrapperProps {
  onClose?: () => void;
  userId: number; // Current user ID who is creating the issue
}

const IssueFormWrapper: React.FC<IssueFormWrapperProps> = ({ onClose, userId }) => {
  const { createIssue } = useIssues();

  const handleSubmit = async (issueData: any) => {
    try {
      // Map frontend issue data to backend format
      const backendIssueData = {
        issuerId: userId,
        issueDescription: issueData.description,
        issueType: issueData.type.toLowerCase(),
        issueStatus: 'pending'
      };

      await createIssue(backendIssueData);
    } catch (error) {
      console.error('Failed to create issue:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <IssueForm 
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default IssueFormWrapper; 
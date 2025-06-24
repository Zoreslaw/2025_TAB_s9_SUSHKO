import { useState, useEffect } from 'react';
import { apiService, convertRoleToEnglish } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const useIssues = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.userId) {
        setIssues([]);
        return;
      }

      const userId = parseInt(user.userId);
      const userRole = convertRoleToEnglish(user.role);
      
      const data = await apiService.getIssues(userId, userRole);
      setIssues(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [user?.userId]);

  const createIssue = async (issueData: any) => {
    try {
      const newIssue = await apiService.createIssue(issueData);
      setIssues(prev => [...prev, newIssue]);
      return newIssue;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create issue');
      throw err;
    }
  };

  const updateIssue = async (id: number, issueData: any) => {
    try {
      await apiService.updateIssue(id, issueData);
      setIssues(prev => prev.map(issue => 
        issue.issueId === id ? { ...issue, ...issueData } : issue
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update issue');
      throw err;
    }
  };

  const deleteIssue = async (id: number) => {
    try {
      await apiService.deleteIssue(id);
      setIssues(prev => prev.filter(issue => issue.issueId !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete issue');
      throw err;
    }
  };

  return {
    issues,
    loading,
    error,
    fetchIssues,
    createIssue,
    updateIssue,
    deleteIssue,
  };
}; 
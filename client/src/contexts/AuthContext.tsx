import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRoles, UserStatus } from '../types/User';
import { apiService, convertApiUserToUser, LoginRequest } from '../services/api';

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data removed - now using real API authentication

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const user = JSON.parse(storedUser) as User;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to restore authentication state',
        });
      }
    };

    checkAuthStatus();
  }, []);

  // Login function - using real API
  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Call real API
      const loginRequest: LoginRequest = {
        login: credentials.login,
        password: credentials.password,
      };
      
      const loginResponse = await apiService.login(loginRequest);
      
      // Convert API response to frontend User type
      const user = convertApiUserToUser(loginResponse);
      
      // Store in localStorage (without password)
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed. Please check your credentials.',
      }));
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call API logout (optional, for server-side cleanup)
      await apiService.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local state
      localStorage.removeItem('user');
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };

  // Clear error
  const clearError = () => {
    setAuthState(prev => ({
      ...prev,
      error: null,
    }));
  };

  // Context value
  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

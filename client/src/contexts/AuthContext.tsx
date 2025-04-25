import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRoles, UserStatus } from '../types/User';

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
  logout: () => void;
  clearError: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for users
const MOCK_USERS: User[] = [
  {
    userId: '1',
    login: 'admin',
    password: 'admin123',
    avatarUrl: '',
    role: UserRoles.ADMIN,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-01-01'),
  },
  {
    userId: '2',
    login: 'manager',
    password: 'manager123',
    avatarUrl: '',
    role: UserRoles.MANAGER,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-02-15'),
  },
  {
    userId: '3',
    login: 'resident',
    password: 'resident123',
    avatarUrl: '',
    role: UserRoles.RESIDENT,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-03-10'),
  },
  {
    userId: '4',
    login: 'tenant',
    password: 'tenant123',
    avatarUrl: '',
    role: UserRoles.TENANT,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-04-20'),
  },
  {
    userId: '5',
    login: 'blocked',
    password: 'blocked123',
    avatarUrl: '',
    role: UserRoles.RESIDENT,
    userStatus: UserStatus.BLOCKED,
    userCreationDate: new Date('2023-05-05'),
  },
];

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

  // Login function - will be replaced with real API call
  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const user = MOCK_USERS.find(
        u => u.login === credentials.login && u.password === credentials.password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      if (user.userStatus !== UserStatus.ACTIVE) {
        throw new Error(`Account is ${user.userStatus.toLowerCase()}`);
      }
      
      // Remove password from user object before storing
      const { password, ...secureUser } = user;
      const userToStore = { ...secureUser, password: '' };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userToStore));
      
      setAuthState({
        user: userToStore as User,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
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

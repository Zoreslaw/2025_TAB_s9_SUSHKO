import { User, UserStatus } from '../types/User';
import { LoginCredentials } from '../contexts/AuthContext';

// Mock data is in the AuthContext for now, but in a real app
// we would replace these methods with actual API calls

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

class AuthService {
  /**
   * Login user
   * @param credentials User login credentials
   * @returns Promise with user data and token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // In a real implementation, this would be:
    // return await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials)
    // }).then(res => {
    //   if (!res.ok) throw new Error('Authentication failed');
    //   return res.json();
    // });
    
    // For now, we're letting the mock implementation in the AuthContext handle this
    throw new Error('Use the login method from AuthContext instead');
  }

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Promise with user data and token
   */
  async register(userData: Omit<User, 'userId' | 'userCreationDate' | 'userStatus'>): Promise<AuthResponse> {
    // In a real implementation, this would be:
    // return await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // }).then(res => {
    //   if (!res.ok) throw new Error('Registration failed');
    //   return res.json();
    // });
    
    throw new Error('Not implemented yet');
  }

  /**
   * Get current user from token
   * @returns Promise with user data 
   */
  async getCurrentUser(): Promise<User> {
    // In a real implementation, this would be:
    // const token = localStorage.getItem('token');
    // if (!token) throw new Error('No authentication token found');
    //
    // return await fetch('/api/auth/me', {
    //   headers: { 
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json' 
    //   }
    // }).then(res => {
    //   if (!res.ok) throw new Error('Failed to get user data');
    //   return res.json();
    // });
    
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      throw new Error('No user found');
    }
    
    return JSON.parse(storedUser) as User;
  }

  /**
   * Logout user and remove token
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  /**
   * Check if user is authenticated
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}

export default new AuthService(); 
import { User, UserRoles, UserStatus } from '../types/User';
import { Resident, ResidentStatus } from '../types/Resident';

const API_BASE_URL = 'http://localhost:5213/api';

// Types for API responses
export interface ApiUser {
  userId: number;
  login: string;
  avatarUrl?: string;
  role?: string;
  userStatus?: string;
  userCreationDate: string;
  residents?: ApiResident[];
}

export interface ApiResident {
  residentId: number;
  apartmentId: number;
  apartmentNumber?: string;
  buildingAddress?: string;
  moveinDate?: string;
  residentStatus?: string;
  moveoutDate?: string;
  tenant?: ApiTenant;
}

export interface ApiTenant {
  tenantId: number;
  leaseStartDate?: string;
  leaseEndDate?: string;
}

export interface CreateUserRequest {
  login: string;
  password: string;
  avatarUrl?: string;
  role?: string;
  userStatus?: string;
}

export interface UpdateUserRequest {
  login?: string;
  avatarUrl?: string;
  role?: string;
  userStatus?: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  login: string;
  avatarUrl?: string;
  role?: string;
  userStatus?: string;
  userCreationDate: string;
  residents?: ApiResident[];
}

export interface ApiPayment {
  paymentId: number;
  tenantId: number;
  approverId?: number;
  apartmentId: number;
  paymentAmount: number;
  paymentDescription: string;
  paymentDate: string;
  paymentStatus: string;
}

export interface ApiIssue {
  issueId: number;
  issuerId: number;
  operatorId?: number;
  issueDescription: string;
  issueStatus: string;
  issueType: string;
  issueCreationDate: string;
  issueUpdateDate?: string;
}

export interface ApiNotification {
  id: string;
  title: string;
  date: string;
  description: string;
  type: string;
  priority: string;
}

// API functions
export const apiService = {
  // Users
  async getUsers(): Promise<ApiUser[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
  },

  async getUserById(id: number): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    return response.json();
  },

  async createUser(userData: CreateUserRequest): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create user: ${errorText}`);
    }
    return response.json();
  },

  async updateUser(id: number, userData: UpdateUserRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update user: ${errorText}`);
    }
  },

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  },

  // Authentication
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Login failed');
    }

    return response.json();
  },

  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  // Payments
  async getPayments(): Promise<ApiPayment[]> {
    const response = await fetch(`${API_BASE_URL}/payments`);
    if (!response.ok) {
      throw new Error(`Failed to fetch payments: ${response.statusText}`);
    }
    return response.json();
  },

  // Issues
  async getIssues(): Promise<ApiIssue[]> {
    const response = await fetch(`${API_BASE_URL}/issues`);
    if (!response.ok) {
      throw new Error(`Failed to fetch issues: ${response.statusText}`);
    }
    return response.json();
  },

  // Notifications
  async getNotifications(): Promise<ApiNotification[]> {
    const response = await fetch(`${API_BASE_URL}/notifications`);
    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }
    return response.json();
  },
};

// Helper functions to convert API data to frontend types
export const convertApiUserToUser = (apiUser: ApiUser): User => {
  // Map role string to enum
  let role: UserRoles;
  switch (apiUser.role?.toLowerCase()) {
    case 'administrator':
    case 'admin':
      role = UserRoles.ADMIN;
      break;
    case 'manager':
      role = UserRoles.MANAGER;
      break;
    case 'tenant':
      role = UserRoles.TENANT;
      break;
    case 'resident':
    default:
      role = UserRoles.RESIDENT;
      break;
  }

  // Map status string to enum
  let userStatus: UserStatus;
  switch (apiUser.userStatus?.toLowerCase()) {
    case 'inactive':
      userStatus = UserStatus.INACTIVE;
      break;
    case 'blocked':
      userStatus = UserStatus.BLOCKED;
      break;
    case 'active':
    default:
      userStatus = UserStatus.ACTIVE;
      break;
  }

  return {
    userId: apiUser.userId.toString(),
    login: apiUser.login,
    password: '', // Don't expose password
    avatarUrl: apiUser.avatarUrl || '',
    role,
    userStatus,
    userCreationDate: new Date(apiUser.userCreationDate),
  };
};

export const convertApiResidentToResident = (apiResident: ApiResident, userId: string): Resident => {
  // Map status string to enum
  let residentStatus: ResidentStatus;
  switch (apiResident.residentStatus?.toLowerCase()) {
    case 'former':
      residentStatus = ResidentStatus.FORMER;
      break;
    case 'pending':
      residentStatus = ResidentStatus.PENDING;
      break;
    case 'active':
    default:
      residentStatus = ResidentStatus.ACTIVE;
      break;
  }

  return {
    residentId: apiResident.residentId.toString(),
    userId: userId,
    apartmentId: apiResident.apartmentId.toString(),
    moveInDate: apiResident.moveinDate ? new Date(apiResident.moveinDate) : new Date(),
    residentStatus,
    moveOutDate: apiResident.moveoutDate ? new Date(apiResident.moveoutDate) : undefined,
  };
}; 
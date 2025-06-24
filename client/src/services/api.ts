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
  notificationId: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  priority: string;
  isRead: boolean;
  createdDate: string;
  readDate?: string;
  issueId?: number;
  orderId?: number;
  paymentId?: number;
}

export interface ApiBuilding {
  buildingId: number;
  address: string;
  flats: number;
}

export interface ApiApartment {
  apartmentId: number;
  buildingId: number;
  apartmentNumber: string;
  buildingAddress: string;
}

export interface ApiOrder {
  orderId: number;
  ordererId: number;
  ordererName: string;
  issueId: number;
  issueDescription: string;
  cost: number;
  contractor: string;
  orderDescription: string;
  orderStatus: string;
  orderCreationDate: string;
  orderEndDate?: string;
}

export interface CreateBuildingRequest {
  address: string;
  flats: number;
}

export interface UpdateBuildingRequest {
  address?: string;
  flats?: number;
}

export interface CreateApartmentRequest {
  buildingId: number;
  apartmentNumber: string;
}

export interface UpdateApartmentRequest {
  buildingId?: number;
  apartmentNumber?: string;
}

// Helper to map Polish status to English
function mapStatusToEnglish(status: string) {
  switch (status?.toLowerCase()) {
    case 'aktywny': return 'active';
    case 'nieaktywny': return 'inactive';
    case 'zablokowany': return 'blocked';
    default: return status;
  }
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
  async getPayments(userId?: number, userRole?: string): Promise<ApiPayment[]> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId.toString());
    if (userRole) params.append('userRole', userRole);
    const url = `${API_BASE_URL}/payments${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch payments: ${response.statusText}`);
    }
    return response.json();
  },

  async getUserPayments(userId: number): Promise<ApiPayment[]> {
    const response = await fetch(`${API_BASE_URL}/payments/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user payments: ${response.statusText}`);
    }
    return response.json();
  },

  async createPayment(paymentData: any): Promise<ApiPayment> {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create payment: ${errorText}`);
    }
    return response.json();
  },

  async updatePayment(id: number, paymentData: any): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update payment: ${errorText}`);
    }
  },

  async deletePayment(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete payment: ${response.statusText}`);
    }
  },

  // Issues
  async getIssues(userId?: number, userRole?: string): Promise<ApiIssue[]> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId.toString());
    if (userRole) params.append('userRole', userRole);
    const url = `${API_BASE_URL}/issues${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch issues: ${response.statusText}`);
    }
    return response.json();
  },

  async getUserIssues(userId: number): Promise<ApiIssue[]> {
    const response = await fetch(`${API_BASE_URL}/issues/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user issues: ${response.statusText}`);
    }
    return response.json();
  },

  async createIssue(issueData: any): Promise<ApiIssue> {
    const response = await fetch(`${API_BASE_URL}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create issue: ${errorText}`);
    }
    return response.json();
  },

  async updateIssue(id: number, issueData: any): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update issue: ${errorText}`);
    }
  },

  async deleteIssue(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete issue: ${response.statusText}`);
    }
  },

  // Notifications
  async getNotifications(userId?: number, userRole?: string): Promise<ApiNotification[]> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId.toString());
    if (userRole) params.append('userRole', userRole);
    const url = `${API_BASE_URL}/notifications${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }
    return response.json();
  },
 
  async registerResident(userData: any): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: userData.login,
        password: userData.password || 'defaultPassword123',
        firstName: userData.firstName,
        lastName: userData.lastName,
        buildingId: userData.buildingId,
        apartmentNumber: userData.apartmentNumber,
        moveInDate: userData.moveInDate,
        moveOutDate: userData.moveOutDate,
        role: userData.role?.toLowerCase() || 'resident',
        userStatus: mapStatusToEnglish(userData.status) || 'active',
        avatarUrl: userData.avatarUrl
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to register resident: ${errorText}`);
    }

    return response.json();
  },

  async registerManager(userData: any): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users/register-manager`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: userData.login,
        password: userData.password || 'defaultPassword123',
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role?.toLowerCase() || 'manager',
        userStatus: userData.status || 'active',
        avatarUrl: userData.avatarUrl
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to register manager: ${errorText}`);
    }

    return response.json();
  },

  // Buildings
  async getBuildings(): Promise<ApiBuilding[]> {
    const response = await fetch(`${API_BASE_URL}/buildings`);
    if (!response.ok) {
      throw new Error(`Failed to fetch buildings: ${response.statusText}`);
    }
    return response.json();
  },

  async createBuilding(buildingData: CreateBuildingRequest): Promise<ApiBuilding> {
    const response = await fetch(`${API_BASE_URL}/buildings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildingData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create building: ${errorText}`);
    }
    return response.json();
  },

  async updateBuilding(id: number, buildingData: UpdateBuildingRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/buildings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildingData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update building: ${errorText}`);
    }
  },

  async deleteBuilding(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/buildings/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete building: ${response.statusText}`);
    }
  },

  // Apartments
  async getApartments(): Promise<ApiApartment[]> {
    const response = await fetch(`${API_BASE_URL}/apartments`);
    if (!response.ok) {
      throw new Error(`Failed to fetch apartments: ${response.statusText}`);
    }
    return response.json();
  },

  async createApartment(apartmentData: CreateApartmentRequest): Promise<ApiApartment> {
    const response = await fetch(`${API_BASE_URL}/apartments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apartmentData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create apartment: ${errorText}`);
    }
    return response.json();
  },

  async updateApartment(id: number, apartmentData: UpdateApartmentRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/apartments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apartmentData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update apartment: ${errorText}`);
    }
  },

  async deleteApartment(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/apartments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete apartment: ${response.statusText}`);
    }
  },

  // Orders
  async getOrders(userId?: number, userRole?: string): Promise<ApiOrder[]> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId.toString());
    if (userRole) params.append('userRole', userRole);
    const url = `${API_BASE_URL}/orders${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }
    return response.json();
  },

  async getOrderById(id: number): Promise<ApiOrder> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.statusText}`);
    }
    return response.json();
  },

  async createOrder(orderData: any): Promise<ApiOrder> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create order: ${errorText}`);
    }
    return response.json();
  },

  async updateOrder(id: number, orderData: any): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update order: ${errorText}`);
    }
  },

  async deleteOrder(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete order: ${response.statusText}`);
    }
  },

  // Notifications
  async getUserNotifications(userId: number): Promise<ApiNotification[]> {
    const response = await fetch(`${API_BASE_URL}/notifications/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user notifications: ${response.statusText}`);
    }
    return response.json();
  },

  async getNotificationById(id: number): Promise<ApiNotification> {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch notification: ${response.statusText}`);
    }
    return response.json();
  },

  async createNotification(notificationData: any): Promise<ApiNotification> {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create notification: ${errorText}`);
    }
    return response.json();
  },

  async updateNotification(id: number, notificationData: any): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update notification: ${errorText}`);
    }
  },

  async markNotificationAsRead(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`);
    }
  },

  async deleteNotification(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete notification: ${response.statusText}`);
    }
  },

  // Issue management
  async assignOperatorToIssue(issueId: number, operatorId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/issues/${issueId}/assign`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(operatorId),
    });
    if (!response.ok) {
      throw new Error(`Failed to assign operator: ${response.statusText}`);
    }
  },

  async updateIssueStatus(issueId: number, status: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/issues/${issueId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(status),
    });
    if (!response.ok) {
      throw new Error(`Failed to update issue status: ${response.statusText}`);
    }
  },

  // Payment from order
  async createPaymentFromOrder(orderId: number, approverId: number): Promise<ApiPayment> {
    const response = await fetch(`${API_BASE_URL}/payments/from-order/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approverId),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create payment from order: ${errorText}`);
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
    firstName: '', // These fields are not provided by the API
    lastName: '', // These fields are not provided by the API
    address: apiResident.buildingAddress || '', // Use building address from API
    apartmentNumber: apiResident.apartmentNumber || '', // Use apartment number from API
    login: '', // Not provided by API
    password: '', // Not provided by API
    avatarUrl: '', // Not provided by API
    role: UserRoles.RESIDENT, // Default role
    userStatus: UserStatus.ACTIVE, // Default status
    userCreationDate: new Date(), // Default date
    moveInDate: apiResident.moveinDate ? new Date(apiResident.moveinDate) : new Date(),
    residentStatus,
    moveOutDate: apiResident.moveoutDate ? new Date(apiResident.moveoutDate) : undefined,
  };
};

// Helper to convert Polish role to English for API
export function convertRoleToEnglish(role: string): string {
  switch (role) {
    case 'admin':
      return 'admin';
    case 'menadżer':
      return 'manager';
    case 'mieszkaniec':
      return 'resident';
    case 'najemca':
      return 'tenant';
    default:
      return 'resident';
  }
}
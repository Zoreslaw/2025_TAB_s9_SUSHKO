import { User, UserRoles, UserStatus } from '../types/User';
import { Building } from '../types/Building';
import { Apartment } from '../types/Apartment';
import { Resident, ResidentStatus } from '../types/Resident';
import { Payment, PaymentStatus, PaymentType } from '../types/Payment';
import { Issue, IssueStatus, IssueType } from '../types/Issue';
import { Order, OrderStatus } from '../types/Order';

// Mock Users
export const mockUsers: User[] = [
  {
    userId: '1',
    login: 'admin',
    password: 'admin123', // In a real app, this would be hashed
    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
    role: UserRoles.ADMIN,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-01-01')
  },
  {
    userId: '2',
    login: 'manager',
    password: 'manager123', 
    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
    role: UserRoles.MANAGER,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-01-15')
  },
  {
    userId: '3',
    login: 'resident1',
    password: 'resident123', 
    avatarUrl: 'https://mui.com/static/images/avatar/3.jpg',
    role: UserRoles.RESIDENT,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-02-01')
  },
  {
    userId: '4',
    login: 'resident2',
    password: 'resident456', 
    avatarUrl: 'https://mui.com/static/images/avatar/4.jpg',
    role: UserRoles.RESIDENT,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-02-15')
  },
  {
    userId: '5',
    login: 'tenant1',
    password: 'tenant123', 
    avatarUrl: 'https://mui.com/static/images/avatar/5.jpg',
    role: UserRoles.TENANT,
    userStatus: UserStatus.ACTIVE,
    userCreationDate: new Date('2023-03-01')
  }
];

// Mock Buildings
export const mockBuildings: Building[] = [
  {
    buildingId: '1',
    address: 'ul. Warszawska 10, Kraków'
  },
  {
    buildingId: '2',
    address: 'ul. Krakowska 20, Warszawa'
  }
];

// Mock Apartments
export const mockApartments: Apartment[] = [
  {
    apartmentId: '1',
    buildingId: '1',
    apartmentNumber: '101'
  },
  {
    apartmentId: '2',
    buildingId: '1',
    apartmentNumber: '102'
  },
  {
    apartmentId: '3',
    buildingId: '2',
    apartmentNumber: '201'
  },
  {
    apartmentId: '4',
    buildingId: '2',
    apartmentNumber: '202'
  }
];

// Mock Residents
export const mockResidents: Resident[] = [
  {
    residentId: '1',
    userId: '3',
    apartmentId: '1',
    moveInDate: new Date('2023-03-01'),
    residentStatus: ResidentStatus.ACTIVE
  },
  {
    residentId: '2',
    userId: '4',
    apartmentId: '2',
    moveInDate: new Date('2023-04-01'),
    residentStatus: ResidentStatus.ACTIVE
  },
  {
    residentId: '3',
    userId: '5',
    apartmentId: '3',
    moveInDate: new Date('2023-05-01'),
    residentStatus: ResidentStatus.ACTIVE
  }
];

// Mock Payments
export const mockPayments: Payment[] = [
  // Resident 1 payments (userId = 3)
  {
    paymentId: '1',
    payerId: '3',
    approverId: '2',
    apartmentId: '1',
    amount: 1500,
    description: 'Czynsz za maj 2023',
    paymentDate: new Date('2023-05-10'),
    dueDate: new Date('2023-05-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  {
    paymentId: '2',
    payerId: '3',
    apartmentId: '1',
    amount: 350,
    description: 'Opłata za wodę',
    paymentDate: new Date('2023-06-05'),
    dueDate: new Date('2023-06-15'),
    status: PaymentStatus.PENDING,
    type: PaymentType.UTILITIES
  },
  {
    paymentId: '6',
    payerId: '3',
    approverId: '2',
    apartmentId: '1',
    amount: 1500,
    description: 'Czynsz za czerwiec 2023',
    paymentDate: new Date('2023-06-10'),
    dueDate: new Date('2023-06-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  {
    paymentId: '7',
    payerId: '3',
    approverId: '2',
    apartmentId: '1',
    amount: 1500,
    description: 'Czynsz za lipiec 2023',
    paymentDate: new Date('2023-07-12'),
    dueDate: new Date('2023-07-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  {
    paymentId: '8',
    payerId: '3',
    apartmentId: '1',
    amount: 320,
    description: 'Opłata za energię elektryczną',
    paymentDate: new Date('2023-07-20'),
    dueDate: new Date('2023-07-25'),
    status: PaymentStatus.PAID,
    type: PaymentType.UTILITIES
  },
  {
    paymentId: '9',
    payerId: '3',
    apartmentId: '1',
    amount: 1500,
    description: 'Czynsz za sierpień 2023',
    paymentDate: new Date('2023-08-10'),
    dueDate: new Date('2023-08-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  {
    paymentId: '10',
    payerId: '3',
    apartmentId: '1',
    amount: 280,
    description: 'Opłata za wywóz śmieci',
    paymentDate: new Date('2023-08-20'),
    dueDate: new Date('2023-08-25'),
    status: PaymentStatus.PAID,
    type: PaymentType.MAINTENANCE
  },
  {
    paymentId: '18',
    payerId: '3',
    apartmentId: '1',
    amount: 1500,
    description: 'Czynsz za wrzesień 2023',
    paymentDate: new Date('2023-09-14'),
    dueDate: new Date('2023-09-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  
  // Resident 2 payments (userId = 4)
  {
    paymentId: '3',
    payerId: '4',
    approverId: '2',
    apartmentId: '2',
    amount: 1200,
    description: 'Czynsz za czerwiec 2023',
    paymentDate: new Date('2023-06-12'),
    dueDate: new Date('2023-06-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  {
    paymentId: '4',
    payerId: '4',
    apartmentId: '2',
    amount: 250,
    description: 'Opłata za prąd',
    paymentDate: new Date('2023-06-10'),
    dueDate: new Date('2023-06-20'),
    status: PaymentStatus.PENDING,
    type: PaymentType.UTILITIES
  },
  {
    paymentId: '11',
    payerId: '4',
    approverId: '2',
    apartmentId: '2',
    amount: 1200,
    description: 'Czynsz za lipiec 2023',
    paymentDate: new Date('2023-07-14'),
    dueDate: new Date('2023-07-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  {
    paymentId: '12',
    payerId: '4',
    apartmentId: '2',
    amount: 190,
    description: 'Opłata za internet',
    paymentDate: new Date('2023-07-18'),
    dueDate: new Date('2023-07-20'),
    status: PaymentStatus.PAID,
    type: PaymentType.UTILITIES
  },
  {
    paymentId: '13',
    payerId: '4',
    apartmentId: '2',
    amount: 1200,
    description: 'Czynsz za sierpień 2023',
    paymentDate: new Date('2023-08-12'),
    dueDate: new Date('2023-08-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  {
    paymentId: '14',
    payerId: '4',
    apartmentId: '2',
    amount: 450,
    description: 'Naprawa instalacji wodnej',
    paymentDate: new Date('2023-08-25'),
    dueDate: new Date('2023-08-30'),
    status: PaymentStatus.CANCELLED,
    type: PaymentType.MAINTENANCE
  },
  {
    paymentId: '15',
    payerId: '4',
    apartmentId: '2',
    amount: 1200,
    description: 'Czynsz za wrzesień 2023',
    paymentDate: new Date('2023-09-12'),
    dueDate: new Date('2023-09-15'),
    status: PaymentStatus.PAID,
    type: PaymentType.RENT
  },
  {
    paymentId: '16',
    payerId: '4',
    apartmentId: '2',
    amount: 220,
    description: 'Opłata za gaz',
    paymentDate: new Date(),
    dueDate: new Date('2023-09-25'),
    status: PaymentStatus.OVERDUE,
    type: PaymentType.UTILITIES
  },
  
  // Resident 3 payments (userId = 5)
  {
    paymentId: '5',
    payerId: '5',
    apartmentId: '3',
    amount: 1350,
    description: 'Czynsz za lipiec 2023',
    paymentDate: new Date(),
    dueDate: new Date('2023-07-15'),
    status: PaymentStatus.OVERDUE,
    type: PaymentType.RENT
  },
  {
    paymentId: '17',
    payerId: '5',
    apartmentId: '3',
    amount: 310,
    description: 'Opłata za wodę i kanalizację',
    paymentDate: new Date(),
    dueDate: new Date('2023-07-30'),
    status: PaymentStatus.OVERDUE,
    type: PaymentType.UTILITIES
  },
  {
    paymentId: '19',
    payerId: '5',
    apartmentId: '3',
    amount: 1350,
    description: 'Czynsz za sierpień 2023',
    paymentDate: new Date(),
    dueDate: new Date('2023-08-15'),
    status: PaymentStatus.OVERDUE,
    type: PaymentType.RENT
  },
  {
    paymentId: '20',
    payerId: '5',
    apartmentId: '3',
    amount: 1350,
    description: 'Czynsz za wrzesień 2023',
    paymentDate: new Date(),
    dueDate: new Date('2023-09-15'),
    status: PaymentStatus.PENDING,
    type: PaymentType.RENT
  },
  {
    paymentId: '21',
    payerId: '5',
    apartmentId: '3',
    amount: 280,
    description: 'Opłata za internet i TV',
    paymentDate: new Date(),
    dueDate: new Date('2023-09-20'),
    status: PaymentStatus.PENDING,
    type: PaymentType.UTILITIES
  }
];

// Mock Issues
export const mockIssues: Issue[] = [
  {
    issueId: '1',
    issuerId: '3',
    operatorId: '2',
    description: 'Cieknący kran w łazience',
    status: IssueStatus.RESOLVED,
    type: IssueType.MAINTENANCE,
    creationDate: new Date('2023-04-15'),
    updateDate: new Date('2023-04-20')
  },
  {
    issueId: '2',
    issuerId: '4',
    description: 'Problem z ogrzewaniem',
    status: IssueStatus.IN_PROGRESS,
    type: IssueType.MAINTENANCE,
    creationDate: new Date('2023-05-05')
  },
  {
    issueId: '3',
    issuerId: '5',
    description: 'Pytanie o harmonogram płatności',
    status: IssueStatus.NEW,
    type: IssueType.PAYMENT,
    creationDate: new Date('2023-06-01')
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    orderId: '1',
    ordererId: '2',
    issueId: '1',
    cost: 200,
    contractor: 'Usługi Hydrauliczne Sp. z o.o.',
    description: 'Naprawa cieknącego kranu',
    status: OrderStatus.COMPLETED,
    creationDate: new Date('2023-04-16'),
    endDate: new Date('2023-04-19')
  },
  {
    orderId: '2',
    ordererId: '2',
    issueId: '2',
    cost: 500,
    contractor: 'Technika Grzewcza Sp. z o.o.',
    description: 'Naprawa systemu ogrzewania',
    status: OrderStatus.IN_PROGRESS,
    creationDate: new Date('2023-05-06')
  }
];

// Service functions for data fetching
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.userId === userId);
};

export const getApartmentsByBuildingId = (buildingId: string): Apartment[] => {
  return mockApartments.filter(apt => apt.buildingId === buildingId);
};

export const getResidentByUserId = (userId: string): Resident | undefined => {
  return mockResidents.find(resident => resident.userId === userId);
};

export const getPaymentsByUserId = (userId: string): Payment[] => {
  return mockPayments.filter(payment => payment.payerId === userId);
};

export const getIssuesByUserId = (userId: string): Issue[] => {
  return mockIssues.filter(issue => issue.issuerId === userId);
};

export const getOverduePayments = (): Payment[] => {
  return mockPayments.filter(payment => payment.status === PaymentStatus.OVERDUE);
};

export const getPendingIssues = (): Issue[] => {
  return mockIssues.filter(issue => issue.status === IssueStatus.NEW);
}; 
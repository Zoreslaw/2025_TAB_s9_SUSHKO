# Property Management System

A comprehensive property management system with user management, payment tracking, and issue reporting functionality.

## System Overview

This system consists of:
- **Frontend**: React TypeScript application with Material-UI components
- **Backend**: ASP.NET Core Web API with Entity Framework Core
- **Database**: PostgreSQL database

## Frontend Functionality

### User Management
- **User Registration**: Register new residents, tenants, and managers
- **User Editing**: Update user information and status
- **User Table**: View all users with search and filtering capabilities
- **Role-based Access**: Different roles (Admin, Manager, Resident, Tenant)

### Payment Management
- **Payment Tracking**: View all payments with status tracking
- **Payment Creation**: Create new payment records
- **Payment History**: Track payment history and outstanding amounts
- **Payment Status**: Pending, Paid, Overdue, Cancelled

### Issue Management
- **Issue Reporting**: Report maintenance and other issues
- **Issue Tracking**: Track issue status and progress
- **Issue Types**: Maintenance, Payment, Other
- **Issue Status**: New, In Progress, Resolved, Cancelled

### Dashboard
- **Payments Panel**: Overview of pending and overdue payments
- **Issues Panel**: Active issues and resolution progress
- **Notifications**: System notifications and alerts

## Backend API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `POST /api/users/register` - Register resident with apartment info

### Issues
- `GET /api/issues` - Get all issues
- `GET /api/issues/{id}` - Get issue by ID
- `POST /api/issues` - Create new issue
- `PUT /api/issues/{id}` - Update issue
- `DELETE /api/issues/{id}` - Delete issue

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/{id}` - Get payment by ID
- `POST /api/payments` - Create new payment
- `PUT /api/payments/{id}` - Update payment
- `DELETE /api/payments/{id}` - Delete payment

### Notifications
- `GET /api/notifications` - Get all notifications

## Data Models

### User
```typescript
interface User {
  userId: string;
  login: string;
  password: string;
  avatarUrl: string;
  role: UserRoles;
  userStatus: UserStatus;
  userCreationDate: Date;
}
```

### Resident
```typescript
interface Resident extends User {
  residentId: string;
  userId: string;
  apartmentId: string;
  firstName: string;
  lastName: string;
  address: string;
  apartmentNumber: string;
  moveInDate: Date;
  residentStatus: ResidentStatus;
  moveOutDate?: Date;
}
```

### Payment
```typescript
interface Payment {
  paymentId: string;
  payerId: string;
  approverId?: string;
  apartmentId: string;
  amount: number;
  description: string;
  paymentDate: Date;
  dueDate: Date;
  status: PaymentStatus;
  type: PaymentType;
}
```

### Issue
```typescript
interface Issue {
  issueId: string;
  issuerId: string;
  operatorId?: string;
  description: string;
  status: IssueStatus;
  type: IssueType;
  creationDate: Date;
  updateDate?: Date;
}
```

## Setup Instructions

### Backend Setup
1. Navigate to the `server` directory
2. Update connection string in `appsettings.json`
3. Run database migrations:
   ```bash
   dotnet ef database update
   ```
4. Start the server:
   ```bash
   dotnet run
   ```

### Frontend Setup
1. Navigate to the `client` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

Use the provided `test-endpoints.http` file to test all API endpoints. You can run these tests in VS Code with the REST Client extension or in any HTTP client like Postman.

## Key Features Implemented

### ✅ Complete CRUD Operations
- User management (Create, Read, Update, Delete)
- Issue management (Create, Read, Update, Delete)
- Payment management (Create, Read, Update, Delete)

### ✅ Frontend-Backend Integration
- API service layer with proper error handling
- Custom hooks for data management
- Real-time data updates

### ✅ User Registration System
- Automatic building and apartment creation
- Role-based user creation
- Password hashing with BCrypt

### ✅ Dashboard Functionality
- Payment overview with outstanding amounts
- Issue tracking with progress indicators
- Real-time data display

### ✅ Form Validation
- Client-side validation for all forms
- Error handling and user feedback
- Auto-generated login credentials

## Missing Functionality (To Be Implemented)

1. **File Upload**: Issue attachments and user avatars
2. **Email Notifications**: Automated email notifications
3. **Advanced Search**: More sophisticated filtering options
4. **Reports**: Payment and issue reports
5. **Audit Logging**: Track all system changes
6. **Mobile App**: React Native mobile application

## Security Features

- Password hashing with BCrypt
- Input validation and sanitization
- Role-based access control
- Secure API endpoints

## Performance Optimizations

- Efficient database queries with Entity Framework
- Frontend state management with React hooks
- Optimized API responses with DTOs
- Lazy loading for large datasets

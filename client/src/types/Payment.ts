export interface Payment {
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

export enum PaymentStatus {
    PAID = 'PAID',
    PENDING = 'PENDING',
    OVERDUE = 'OVERDUE',
    CANCELLED = 'CANCELLED'
}

export enum PaymentType {
    RENT = 'RENT',
    UTILITIES = 'UTILITIES',
    MAINTENANCE = 'MAINTENANCE',
    OTHER = 'OTHER'
} 
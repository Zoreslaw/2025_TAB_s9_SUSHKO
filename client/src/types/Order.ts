export interface Order {
    orderId: string;
    ordererId: string;
    issueId: string;
    cost: number;
    contractor: string;
    description: string;
    status: OrderStatus;
    creationDate: Date;
    endDate?: Date;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
} 
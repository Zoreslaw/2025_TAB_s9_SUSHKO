export interface Order {
    orderId: number;
    ordererId: number;
    ordererName: string;
    issueId: number;
    issueDescription: string;
    cost: number;
    contractor: string;
    orderDescription: string;
    orderStatus: OrderStatus;
    orderCreationDate: Date;
    orderEndDate?: Date;
}

export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface CreateOrderRequest {
    issueId: number;
    cost: number;
    contractor: string;
    orderDescription: string;
}

export interface UpdateOrderRequest {
    cost?: number;
    contractor?: string;
    orderDescription?: string;
    orderStatus?: OrderStatus;
    orderEndDate?: Date;
} 
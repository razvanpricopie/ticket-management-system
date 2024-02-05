export interface OrderDetails {
    orderId: string;
    userId: string;
    orderTotal: number;
    date: Date;
    orderPaid: boolean;
}

export interface CreateOrder {
    // userId: string; TBA
    orderTotal: number;
    date: Date;
    orderPaid: boolean;
}
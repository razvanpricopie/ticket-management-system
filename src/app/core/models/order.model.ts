export interface OrderDetailsPreview {
    id: string;
    userId: string;
    orderTotal: number;
    numberOfTickets: number;
    createdDate: Date;
}

export interface OrderDetails {
    id: string;
    userId: string;
    orderTotal: number;
    tickets: OrderTicket[];
    createdDate: Date;
}

export interface CreateOrder {
    // userId: string; TBA
    orderTotal: number;
    date: Date;
    orderPaid: boolean;
}

export interface OrderTicket {
    ticketId: string;
    quantity: number;
    price: number;
    eventName: number;
}
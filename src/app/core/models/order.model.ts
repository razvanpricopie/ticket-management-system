import { EventDetails, Ticket } from './event.model';

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
  tickets: OrderTicketDetails[];
  createdDate: Date;
}

export interface OrderTicketDetails {
  ticketId: string;
  quantity: number;
  price: number;
  eventName: number;
}

export interface CreateOrder {
  userId: string;
  orderTotal: number;
  tickets: CreateOrderTicket[];
}

export interface CreateOrderTicket {
  eventId: string;
  quantity: number;
  price: number;
}

export interface UserOrderDetails {
  id: string;
  userId: string;
  orderTotal: number;
  tickets: UserOrderTicket[];
  createdDate: Date;
}

export interface UserOrderTicket {
  eventId: string;
  event: EventDetails;
  quantity: number;
  price: number;
}

export interface UserOrderTicketEvent {
  eventId: string;
  name: string;
  date: Date;
  artist: string;
  imageUrl: string;
  location: string;
}

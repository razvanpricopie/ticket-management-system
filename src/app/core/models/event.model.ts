import { Category } from './category.model';

export interface EventDetails {
  eventId: string;
  name: string;
  price: number;
  artist: string;
  date: Date;
  description: string;
  location: string;
  image: string;
  category: Category;
}

export interface CreateEvent {
  name: string;
  price: number;
  artist: string;
  date: Date;
  description: string;
  location: string;
  image: Blob | File;
  categoryId: string;
}

export interface UpdateEvent {
  eventId: string;
  name: string;
  price: number;
  artist: string;
  location: string;
  date: Date;
  description: string;
  image: Blob | File;
  categoryId: string;
}

export interface Ticket {
  event: EventDetails;
  quantity: number;
  price: number;
}

import { Category } from "./category.model";

export interface EventDetails {
    eventId: string;
    name: string;
    price: number;
    artist: string;
    date: string;
    description: string;
    location: string;
    imageUrl: string
    category: Category;
}

export interface CreateEvent {
    name: string;
    price: number;
    artist: string;
    date: string;
    description: string;
    location: string;
    imageUrl: string
    categoryId: string;
}

export interface UpdateEvent {
    eventId: string;
    name: string;
    price: number;
    artist: string;
    location: string;
    date: string;
    description: string;
    imageUrl: string
    categoryId: string;
}
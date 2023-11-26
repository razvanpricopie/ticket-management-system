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
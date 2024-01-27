import { EventDetails } from "./event.model";

export interface Category {
    categoryId: string;
    name: string;
    events: EventDetails[];
}

export interface CreateCategory {
    name: string;
}

export interface UpdateCategory {
    categoryId: string;
    name: string;
}
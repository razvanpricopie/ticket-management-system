import { EventDetails } from "./event.model";

export interface Category {
    categoryId: string;
    name: string;
    image: Blob | File;
    events: EventDetails[];
}

export interface CreateCategory {
    name: string;
    image: Blob | File;
}

export interface UpdateCategory {
    categoryId: string;
    name: string;
    image: Blob | File;
}
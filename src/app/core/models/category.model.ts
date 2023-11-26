import { EventDetails } from "./event.model";

export interface Category {
    categoryId: string;
    name: string;
    events: EventDetails[];
}
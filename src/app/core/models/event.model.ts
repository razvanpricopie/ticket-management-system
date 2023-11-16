export interface EventSimple {
    eventId: string;
    name: string;
    date: string;
    imageUrl: string
}

export interface EventDetails {
    eventId: string;
    name: string;
    price: number;
    artist: string;
    date: string;
    description: string;
    imageUrl: string
    categoryId: string;
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { CreateEvent, EventDetails, UpdateEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly basePath = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) {}

  getAllEvents(): Observable<EventDetails[]> {
    return this.httpClient.get<EventDetails[]>(
      `${this.basePath}/api/event/allevents`
    );
  }

  getEventDetails(eventId: string): Observable<EventDetails> {
    return this.httpClient.get<EventDetails>(
      `${this.basePath}/api/event/${eventId}`
    );
  }

  createEvent(createdEvent: CreateEvent): Observable<string> {
    const formData = new FormData();
    formData.append('name', createdEvent.name);
    formData.append('artist', createdEvent.artist);
    formData.append('description', createdEvent.description);
    formData.append('location', createdEvent.location);
    formData.append('price', createdEvent.price.toString());
    formData.append('categoryId', createdEvent.categoryId);
    formData.append('date', createdEvent.date.toISOString());
    formData.append('image', createdEvent.image);

    return this.httpClient.post<string>(
      `${this.basePath}/api/event/addevent`,
      formData
    );
  }

  updateEvent(updatedEvent: UpdateEvent): Observable<void> {
    const formData = new FormData();
    formData.append('eventId', updatedEvent.eventId);
    formData.append('name', updatedEvent.name);
    formData.append('artist', updatedEvent.artist);
    formData.append('description', updatedEvent.description);
    formData.append('location', updatedEvent.location);
    formData.append('price', updatedEvent.price.toString());
    formData.append('categoryId', updatedEvent.categoryId);
    formData.append('date', updatedEvent.date.toISOString());
    formData.append('image', updatedEvent.image);

    return this.httpClient.put<void>(
      `${this.basePath}/api/event/updateevent`,
      formData
    );
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.basePath}/api/event/${eventId}`
    );
  }
}

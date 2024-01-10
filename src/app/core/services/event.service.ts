import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { EventDetails } from '../models/event.model';

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

  createEvent(createdEvent: EventDetails): Observable<string> {
    return this.httpClient.post<string>(
      `${this.basePath}/api/event/addevent`,
      createdEvent
    );
  }

  updateEvent(updatedEvent: EventDetails): Observable<void> {
    return this.httpClient.put<void>(
      `${this.basePath}/api/event/updateevent`,
      updatedEvent
    );
  }

  deleteEvent(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.basePath}/api/event/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import {
  CreateEvent,
  EventDetails,
  UserEventLikeStatus,
  UpdateEvent,
  UserLikeEvent,
} from '../models/event.model';

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

  getUserLikeEventStatus(
    userId: string,
    eventId: string
  ): Observable<UserEventLikeStatus> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('eventId', eventId);

    return this.httpClient.get<UserEventLikeStatus>(
      `${this.basePath}/api/event/getUserLikeEventStatus`,
      { params },
    );
  }

  likeEvent(eventLikeStatus: UserLikeEvent): Observable<void> {
    return this.httpClient.post<void>(
      `${this.basePath}/api/event/likeEvent`,
      eventLikeStatus
    );
  }

  dislikeEvent(eventLikeStatus: UserLikeEvent): Observable<void> {
    return this.httpClient.post<void>(
      `${this.basePath}/api/event/dislikeEvent`,
      eventLikeStatus
    );
  }

  deleteUserLikeEventStatus(id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.basePath}/api/event/deleteUserLikeEventStatus/${id}`
    );
  }

  getUserLikedEvents(userId: string): Observable<EventDetails[]> {
    return this.httpClient.get<EventDetails[]>(
      `${this.basePath}/api/event/getUserLikedEvents/${userId}`
    );
  }

  getUserDislikedEvents(userId: string): Observable<EventDetails[]> {
    return this.httpClient.get<EventDetails[]>(
      `${this.basePath}/api/event/getUserDislikedEvents/${userId}`
    );
  }
}

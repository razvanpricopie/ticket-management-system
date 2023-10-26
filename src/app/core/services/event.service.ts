import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly basePath = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) { }

  listAllEvents() {
    return this.httpClient.get(`${this.basePath}/api/event/all`)
  }
}

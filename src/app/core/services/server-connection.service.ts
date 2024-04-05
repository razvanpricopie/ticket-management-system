import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, interval, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServerConnectionService {
  private basePath = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {
    this.pingServerStatus();
  }

  getServerConnection(): Observable<string> {
    return this.http.get<string>(`${this.basePath}/api/connection`);
  }

  private pingServerStatus() {
    interval(60000)
      .pipe(switchMap(() => this.getServerConnection()))
      .subscribe();
  }
}

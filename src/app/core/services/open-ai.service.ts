import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { EventDetails } from '../models/event.model';
import {
  Observable,
  ReplaySubject,
  catchError,
  filter,
  forkJoin,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  mostTenBoughtEvents$: Observable<EventDetails[]>;
  lastTenAddedEvents$: Observable<EventDetails[]>;
  tenEventsBasedOnUserOrders$: Observable<EventDetails[]>;
  tenEventsBasedOnUserLikeStatuses$: Observable<EventDetails[]>;
  tenEventsBasedOnOtherUsersLikeStatuses$: Observable<EventDetails[]>;

  private readonly basePath = environment.API_ENDPOINT;
  private userId: string;

  private mostTenBoughtEventsSubject = new ReplaySubject<EventDetails[]>(1);
  private lastTenAddedEventsSubject = new ReplaySubject<EventDetails[]>(1);
  private tenEventsBasedOnUserOrdersSubject = new ReplaySubject<EventDetails[]>(
    1
  );
  private tenEventsBasedOnUserLikeStatusesSubject = new ReplaySubject<
    EventDetails[]
  >(1);
  private tenEventsBasedOnOtherUsersLikeStatusesSubject = new ReplaySubject<
    EventDetails[]
  >(1);

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {
    this.mostTenBoughtEvents$ = this.mostTenBoughtEventsSubject.asObservable();

    this.lastTenAddedEvents$ = this.lastTenAddedEventsSubject.asObservable();

    this.tenEventsBasedOnUserOrders$ =
      this.tenEventsBasedOnUserOrdersSubject.asObservable();

    this.tenEventsBasedOnUserLikeStatuses$ =
      this.tenEventsBasedOnUserLikeStatusesSubject.asObservable();

    this.tenEventsBasedOnOtherUsersLikeStatuses$ =
      this.tenEventsBasedOnOtherUsersLikeStatusesSubject.asObservable();

    this.initUserBasedMethods();

    this.getMostTenBoughtEvents()
      .pipe(take(1))
      .subscribe((events) => {
        this.mostTenBoughtEventsSubject.next(events);
      });

    this.getLastTenAddedEvents()
      .pipe(take(1))
      .subscribe((events) => {
        this.lastTenAddedEventsSubject.next(events);
      });
  }

  getMostTenBoughtEvents(): Observable<EventDetails[]> {
    return this.httpClient.post<EventDetails[]>(
      `${this.basePath}/api/openai/mostTenBoughtEvents`,
      null
    );
  }

  getLastTenAddedEvents(): Observable<EventDetails[]> {
    return this.httpClient.post<EventDetails[]>(
      `${this.basePath}/api/openai/lastTenAddedEvents`,
      null
    );
  }

  getTenEventsBasedOnUserOrders(userId: string): Observable<EventDetails[]> {
    return this.httpClient.post<EventDetails[]>(
      `${this.basePath}/api/openai/tenEventsBasedOnUserOrders/${userId}`,
      null
    );
  }

  getTenEventsBasedOnUserLikeStatuses(
    userId: string
  ): Observable<EventDetails[]> {
    return this.httpClient.post<EventDetails[]>(
      `${this.basePath}/api/openai/getTenEventsBasedOnUserLikeStatuses/${userId}`,
      null
    );
  }

  getTenEventsBasedOnOtherUsersLikeStatuses(
    userId: string
  ): Observable<EventDetails[]> {
    return this.httpClient.post<EventDetails[]>(
      `${this.basePath}/api/openai/getTenEventsBasedOnOtherUsersLikeStatuses/${userId}`,
      null
    );
  }

  private initUserBasedMethods() {
    this.accountService.userAuthStatus$
      .pipe(
        filter((isUserLoggedIn) => isUserLoggedIn),
        switchMap(() => this.accountService.userDetails$),
        filter((userDetails) => !!userDetails.userId),
        switchMap((userDetails) => {
          return forkJoin([
            this.getTenEventsBasedOnUserOrders(userDetails.userId).pipe(
              take(1),
              catchError(() => of([]))
            ),
            this.getTenEventsBasedOnUserLikeStatuses(userDetails.userId).pipe(
              take(1),
              catchError(() => of([]))
            ),
            this.getTenEventsBasedOnOtherUsersLikeStatuses(
              userDetails.userId
            ).pipe(
              take(1),
              catchError(() => of([]))
            ),
          ]);
        })
      )
      .subscribe(
        ([
          tenEventsBasedOnUserOrders,
          tenEventsBasedOnUserLikeStatuses,
          tenEventsBasedOnOtherUsersLikeStatuses,
        ]) => {
          this.tenEventsBasedOnUserOrdersSubject.next(
            tenEventsBasedOnUserOrders
          );
          this.tenEventsBasedOnUserLikeStatusesSubject.next(
            tenEventsBasedOnUserLikeStatuses
          );
          this.tenEventsBasedOnOtherUsersLikeStatusesSubject.next(
            tenEventsBasedOnOtherUsersLikeStatuses
          );
        }
      );
  }
}

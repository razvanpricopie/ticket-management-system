import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../core/services/event.service';
import { EventDetails } from '../core/models/event.model';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { AccountService } from '../core/account/account.service';

@Component({
  selector: 'app-favourite-events',
  templateUrl: './favourite-events.component.html',
  styleUrl: './favourite-events.component.scss',
})
export class FavouriteEventsComponent implements OnInit, OnDestroy {
  likedEvents: EventDetails[] = [];
  disLikedEvents: EventDetails[] = [];

  isUserLoggedIn: boolean;
  userId: string;

  private onDestroy = new Subject<void>();

  constructor(private eventService: EventService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.initUserDeatils();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private initUserDeatils() {
    this.accountService.userAuthStatus$.subscribe((isUserLoggedIn) => {
      this.isUserLoggedIn = isUserLoggedIn;
    });

    this.accountService.userDetails$.subscribe((userDetails) => {
      this.userId = userDetails.userId;
    });
  }

  private initSubscriptions() {
    forkJoin([
      this.eventService.getUserLikedEvents(this.userId),
      this.eventService.getUserDislikedEvents(this.userId),
    ])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(([likedEvents, disLikedEvents]) => {
        this.likedEvents = likedEvents;
        this.disLikedEvents = disLikedEvents;

        console.log(this.likedEvents);
        console.log(this.disLikedEvents);
      });
  }
}

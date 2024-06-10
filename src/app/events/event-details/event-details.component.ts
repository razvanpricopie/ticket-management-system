import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription, forkJoin, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/core/account/account.service';
import {
  EventDetails,
  UserEventLikeStatus,
  UserLikeEvent,
} from 'src/app/core/models/event.model';
import { CartService } from 'src/app/core/services/cart.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  form: FormGroup;

  eventId: string;
  eventDetails: EventDetails;
  userEventLikeStatus: UserEventLikeStatus;

  quantitySub: Subscription = new Subscription();
  quantityValueMultiplied: number = 0;

  imageUrl: SafeUrl;

  loading: boolean = true;

  isUserLoggedIn: boolean;
  private userId: string;

  private onDestroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private cartService: CartService,
    private accountService: AccountService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';

    this.form = this.formBuilder.group({ quantity: [0, Validators.min(0)] });

    this.initUserDeatils();

    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  addTickets() {
    if (this.form.valid) {
      const submittedQuantity = this.form.value.quantity;
      this.cartService.increaseQuantityToCart(
        this.eventDetails,
        submittedQuantity
      );
      this.form.setValue({ quantity: 0 });
    }
  }

  likeEvent() {
    if (
      (this.isUserLoggedIn && this.userEventLikeStatus.isLiked == false) ||
      this.userEventLikeStatus.userId != this.userId ||
      this.userEventLikeStatus.eventId != this.eventId
    ) {
      return;
    }

    if (this.userEventLikeStatus.isLiked == null) {
      const likedEvent: UserLikeEvent = {
        userId: this.userId,
        eventId: this.eventId,
      };

      this.eventService.likeEvent(likedEvent).subscribe(() => {
        this.eventService
          .getUserLikeEventStatus(this.userId, this.eventId)
          .subscribe((userEventLikeStatus) => {
            this.userEventLikeStatus = userEventLikeStatus;
          });
      });
    } else if (this.userEventLikeStatus.isLiked) {
      this.eventService
        .deleteUserLikeEventStatus(this.userEventLikeStatus.id)
        .subscribe(() => {
          this.eventService
            .getUserLikeEventStatus(this.userId, this.eventId)
            .subscribe((userEventLikeStatus) => {
              this.userEventLikeStatus = userEventLikeStatus;
            });
        });
    }
  }

  dislikeEvent() {
    if (
      (this.isUserLoggedIn && this.userEventLikeStatus.isLiked) ||
      this.userEventLikeStatus.userId != this.userId ||
      this.userEventLikeStatus.eventId != this.eventId
    ) {
      return;
    }

    if (this.userEventLikeStatus.isLiked == null) {
      const dislikedEvent: UserLikeEvent = {
        userId: this.userId,
        eventId: this.eventId,
      };
      this.eventService.dislikeEvent(dislikedEvent).subscribe(() => {
        this.eventService
          .getUserLikeEventStatus(this.userId, this.eventId)
          .subscribe((userEventLikeStatus) => {
            this.userEventLikeStatus = userEventLikeStatus;
          });
      });
    } else if (!this.userEventLikeStatus.isLiked) {
      this.eventService
        .deleteUserLikeEventStatus(this.userEventLikeStatus.id)
        .subscribe(() => {
          this.eventService
            .getUserLikeEventStatus(this.userId, this.eventId)
            .subscribe((userEventLikeStatus) => {
              this.userEventLikeStatus = userEventLikeStatus;
            });
        });
    }
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
    const observables: Observable<any>[] = [
      this.eventService.getEventDetails(this.eventId),
    ];

    if (this.isUserLoggedIn) {
      observables.push(
        this.eventService.getUserLikeEventStatus(this.userId, this.eventId)
      );
    }

    forkJoin(observables)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(([eventDetails, userEventLikeStatus]) => {
        this.eventDetails = eventDetails;

        if (this.isUserLoggedIn) {
          this.userEventLikeStatus = userEventLikeStatus;
        }

        this.initEventImage();
        this.loading = false;
      });

    this.subscriptions.push(
      this.form.get('quantity')?.valueChanges.subscribe((value) => {
        this.quantityValueMultiplied = value * this.eventDetails.price;
      }) || new Subscription()
    );
  }

  private initEventImage() {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64,${this.eventDetails.image}`
    );
  }
}

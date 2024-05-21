import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { EventService } from '../core/services/event.service';
import { EventDetails } from '../core/models/event.model';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../core/models/category.model';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  catchError,
  concat,
  first,
  forkJoin,
  of,
  pipe,
  takeUntil,
  tap,
} from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Galleria } from 'primeng/galleria';
import { OpenAIService } from '../core/services/open-ai.service';
import { AccountService } from '../core/account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  events: EventDetails[] = [];
  mostBoughtTenEvents: EventDetails[] = [];
  lastTenAddedEvents: EventDetails[] = [];
  tenEventsBasedOnUserOrders: EventDetails[] = [];

  eventsImageUrls: any[] = [];

  loading: boolean = true;

  private isUserLoggedIn: boolean;
  private onDestroy = new Subject<void>();

  constructor(
    private router: Router,
    private eventService: EventService,
    private categoryService: CategoryService,
    private openAIService: OpenAIService,
    private accountService: AccountService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.checkUserStatus();
    this.initCategoriesAndEvents();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  redirectToCategoryPage(categoryId: string) {
    this.router.navigate(['/categories', categoryId]);
  }

  private checkUserStatus() {
    this.accountService.userAuthStatus$.subscribe((isUserLoggedIn) => {
      this.isUserLoggedIn = isUserLoggedIn;
    });
  }

  private initCategoriesAndEvents() {
    const observables: Observable<any>[] = [
      this.categoryService.getAllCategories(),
      this.eventService.getAllEvents(),
      this.openAIService.mostTenBoughtEvents$.pipe(first()),
      this.openAIService.lastTenAddedEvents$.pipe(first())
    ];

    if (this.isUserLoggedIn) {
      observables.push(
        this.openAIService.tenEventsBasedOnUserOrders$.pipe(first())
      );
    }

    forkJoin(observables)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(([categories, events, mostBoughtTenEvents, lastTenAddedEvents, tenEventsBasedOnUserOrders]) => {
        this.categories = categories;
        this.events = events;
        this.mostBoughtTenEvents = mostBoughtTenEvents;
        this.lastTenAddedEvents = lastTenAddedEvents;
        if (this.isUserLoggedIn)
          this.tenEventsBasedOnUserOrders = tenEventsBasedOnUserOrders;
        this.loading = false;
      });
  }
}

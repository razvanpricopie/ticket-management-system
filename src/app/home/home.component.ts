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
import { Subject, forkJoin, pipe, takeUntil } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Galleria } from 'primeng/galleria';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  events: EventDetails[] = [];
  categories: Category[] = [];

  eventsImageUrls: any[] = [];

  loading: boolean = true;

  private onDestroy = new Subject<void>();

  constructor(
    private router: Router,
    private eventService: EventService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initCategoriesAndEvents();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  redirectToCategoryPage(categoryId: string) {
    this.router.navigate(['/categories', categoryId]);
  }

  private initCategoriesAndEvents() {
    forkJoin([
      this.categoryService.getAllCategories(),
      this.eventService.getAllEvents(),
    ])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(([categories, events]) => {
        this.categories = categories;
        this.events = events;
        this.loading = false;
      });
  }
}

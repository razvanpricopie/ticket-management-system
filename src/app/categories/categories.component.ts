import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../core/models/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../core/services/category.service';
import { EventDetails } from '../core/models/event.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  categoryId: string;
  category: Category;
  eventsOfCategory: EventDetails[] = [];

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';

    this.sub = this.categoryService
      .getCategoryWithEvents(this.categoryId, false)
      .subscribe((category) => {
        this.category = category;
        this.eventsOfCategory = category.events;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

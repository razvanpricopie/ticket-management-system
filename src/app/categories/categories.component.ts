import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../core/models/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../core/services/category.service';
import { EventDetails } from '../core/models/event.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  categoryId: string;
  category: Category;
  categoryEvents: EventDetails[] = [];

  loading: boolean = true;

  imageUrl: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';

    this.sub = this.categoryService
      .getCategoryWithEvents(this.categoryId, false)
      .subscribe((category) => {
        this.category = category;
        this.categoryEvents = category.events;
        this.initCategoryImage();
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private initCategoryImage() {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64,${this.category.image}`
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { EventService } from '../core/services/event.service';
import { EventDetails } from '../core/models/event.model';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../core/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  events: EventDetails[] = [];
  categories: Category[] = [];

  constructor(
    private router: Router,
    private eventService: EventService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.initCategories();
    this.initEvents();
  }

  private initCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  private initEvents() {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }
}

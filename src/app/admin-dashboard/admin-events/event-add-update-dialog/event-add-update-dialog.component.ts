import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CreateEvent,
  EventDetails,
  UpdateEvent,
} from 'src/app/core/models/event.model';
import { EventDetailsDialogComponent } from '../event-details-dialog/event-details-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { EventService } from 'src/app/core/services/event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-add-update-dialog',
  templateUrl: './event-add-update-dialog.component.html',
  styleUrls: ['./event-add-update-dialog.component.scss'],
})
export class EventAddUpdateDialogComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  clonedEventData: EventDetails;
  categoryOptions: Category[];
  eventDetailsForm: FormGroup;

  tomorrowDate: Date = new Date();
  errorMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: EventDetails,
    private dialogRef: MatDialogRef<EventDetailsDialogComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private eventService: EventService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.clonedEventData = this.data ?? {};

    this.initTomorrowDate();

    this.initCategoryOptions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initTomorrowDate() {
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
  }

  initCategoryOptions() {
    this.sub = this.categoryService
      .getAllCategories()
      .subscribe((categories) => {
        this.categoryOptions = categories;
        this.initEventDetailsFormGroup();
      });
  }

  initEventDetailsFormGroup() {
    this.eventDetailsForm = this.formBuilder.group({
      name: [
        this.clonedEventData.name ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      artist: [
        this.clonedEventData.artist ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      date: [
        this.clonedEventData.date ?? this.tomorrowDate,
        [Validators.required],
      ],
      category: [
        this.clonedEventData.category?.categoryId ??
          this.categoryOptions[0].categoryId,
        [Validators.required],
      ],
      location: [
        this.clonedEventData.location ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      price: [
        this.clonedEventData.price ?? '',
        [Validators.required, Validators.min(1)],
      ],
      description: [
        this.clonedEventData.description ?? '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  submit() {
    if (!this.eventDetailsForm.valid) return;

    if (!this.eventDetailsForm.dirty) {
      this.errorMessage = 'No changes made..';
      return;
    }

    if (this.clonedEventData.eventId) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    let eventUpdated: UpdateEvent = {
      eventId: this.clonedEventData.eventId,
      name: this.eventDetailsForm.get('name')?.value,
      price: this.eventDetailsForm.get('price')?.value,
      artist: this.eventDetailsForm.get('artist')?.value,
      date: this.formatDateToDateOnly(this.eventDetailsForm.get('date')?.value),
      description: this.eventDetailsForm.get('description')?.value,
      location: this.eventDetailsForm.get('location')?.value,
      imageUrl: '', //TO COMPLETE AFTER IMAGE FEATURE IMPLEMENTED
      categoryId: this.eventDetailsForm.get('category')?.value,
    };

    this.eventService.updateEvent(eventUpdated).subscribe({
      next: (result) => this.dialogRef.close(true),
      error: (error) => (this.errorMessage = error.error.error),
    });
  }

  create() {
    let newEventCreated: CreateEvent = {
      name: this.eventDetailsForm.get('name')?.value,
      price: this.eventDetailsForm.get('price')?.value,
      artist: this.eventDetailsForm.get('artist')?.value,
      date: this.formatDateToDateOnly(this.eventDetailsForm.get('date')?.value),
      description: this.eventDetailsForm.get('description')?.value,
      location: this.eventDetailsForm.get('location')?.value,
      imageUrl: '', //TO COMPLETE AFTER IMAGE FEATURE IMPLEMENTED
      categoryId: this.eventDetailsForm.get('category')?.value,
    };

    this.eventService.createEvent(newEventCreated).subscribe({
      next: (result) => this.dialogRef.close(true),
      error: (error) => (this.errorMessage = error.error),
    });
  }

  close() {
    this.dialogRef.close();
  }

  //format date with time 00:00 for now
  private formatDateToDateOnly(date: any): Date {
    date = new Date(date);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
  }
}

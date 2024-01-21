import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventDetails } from 'src/app/core/models/event.model';
import { EventDetailsDialogComponent } from '../event-details-dialog/event-details-dialog.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: EventDetails,
    private dialog: MatDialogRef<EventDetailsDialogComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.clonedEventData = this.data ?? {};

    this.initCategoryOptions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
      name: [this.clonedEventData.name ?? ''],
      artist: [this.clonedEventData.artist ?? ''],
      date: [this.clonedEventData.date ?? new Date()],
      categoryName: [
        this.clonedEventData.category?.categoryId ??
          this.categoryOptions[0].categoryId,
      ],
      location: [this.clonedEventData.location ?? ''],
      price: [this.clonedEventData.price ?? ''],
      description: [this.clonedEventData.description ?? ''],
    });
  }

  submit() {
    if (!this.eventDetailsForm.valid)
      return;

    if(this.clonedEventData.eventId) {
      this.update();
    } else {
      this.create();
    }

  }

  update() {
    console.log('TODO - implement update method');
  }

  create() {
    console.log('TODO - implement create method');
  }

  close() {
    this.dialog.close();
  }
}

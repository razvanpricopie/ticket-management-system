import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventDetails } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-event-details-dialog',
  templateUrl: './event-details-dialog.component.html',
  styleUrls: ['./event-details-dialog.component.scss'],
})
export class EventDetailsDialogComponent implements OnInit {
  eventData: EventDetails;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: EventDetails,
    private dialog: MatDialogRef<EventDetailsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.data.eventId && (this.eventData = JSON.parse(JSON.stringify(this.data)));
  }

  close() {
    this.dialog.close();
  }
}

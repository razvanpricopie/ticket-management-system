import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EventDetails } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';
import { EventDetailsDialogComponent } from './event-details-dialog/event-details-dialog.component';
import { EventAddUpdateDialogComponent } from './event-add-update-dialog/event-add-update-dialog.component';
import { DeleteEntityDialogComponent } from 'src/app/shared/components/delete-entity-dialog/delete-entity-dialog.component';

@Component({
  selector: 'admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
})
export class AdminEventsComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<EventDetails>;

  sub!: Subscription;
  dataSource: EventDetails[] = [];

  displayedColumns: string[] = [
    'index',
    'name',
    'artist',
    'date',
    'location',
    'category',
    'edit-delete',
  ];

  constructor(private eventService: EventService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initEventTableData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initEventTableData() {
    this.sub = this.eventService.getAllEvents().subscribe((events) => {
      this.dataSource = [...events];
    });
  }

  openEventDetails(event: EventDetails) {
    this.dialog.open(EventDetailsDialogComponent, {
      data: event,
      width: '800px',
    });
  }

  openAddEventDialog() {
    const dialogRef = this.dialog.open(EventAddUpdateDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.initEventTableData();
    });
  }

  openUpdateEventDialog(event: EventDetails) {
    const dialogRef = this.dialog.open(EventAddUpdateDialogComponent, {
      data: event,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.initEventTableData();
    });
  }

  deleteEvent(event: EventDetails) {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
      width: '640px',
      data: { entity: event, entityType: 'event' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result &&
        this.eventService.deleteEvent(event.eventId).subscribe(() => {
          this.initEventTableData();
        });
    });
  }
}

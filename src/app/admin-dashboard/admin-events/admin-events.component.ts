import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EventDetails } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';
import { EventDetailsDialogComponent } from './event-details-dialog/event-details-dialog.component';
import { EventAddUpdateDialogComponent } from './event-add-update-dialog/event-add-update-dialog.component';

@Component({
  selector: 'admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
})
export class AdminEventsComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<EventDetails>;

  sub!: Subscription;
  events: EventDetails[] = [];

  displayedColumns: string[] = [
    'index',
    'name',
    'artist',
    'date',
    'location',
    'category',
    'edit-delete',
  ];
  dataSource: EventDetails[] = [];

  constructor(private eventService: EventService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initEventTableData();

    this.dataSource = [...this.events];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initEventTableData() {
    this.sub = this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
      this.dataSource = [...this.events];
    });
  }

  openEventDetails(row: EventDetails) {
    this.dialog.open(EventDetailsDialogComponent, {
      data: row,
      width: '800px',
    });
  }

  openAddDeviceDialog() {
    const dialogRef = this.dialog.open(EventAddUpdateDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.initEventTableData();
    })
  }

  openUpdateDeviceDialog(row: EventDetails) {
    const dialogRef = this.dialog.open(EventAddUpdateDialogComponent, {
      data: row,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.initEventTableData();
    })
  }
}

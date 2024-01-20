import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EventDetails } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
})
export class AdminEventsComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<EventDetails>;

  sub!: Subscription;
  events: EventDetails[] = [];

  displayedColumns: string[] = ['index', 'name', 'artist', 'date', 'location', 'category', 'edit-delete'];
  dataSource: EventDetails[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.sub = this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
      this.dataSource = [...this.events];
    });

    this.dataSource = [...this.events];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

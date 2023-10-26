import { Component, OnInit } from '@angular/core';
import { EventService } from '../core/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  events: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.listAllEvents().subscribe(events => {
      this.events = events;
    });
  }


}

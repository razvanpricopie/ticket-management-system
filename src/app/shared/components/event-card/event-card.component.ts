import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventDetails } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() eventId: string;
  @Input() name: string;
  @Input() date: string;
  @Input() location: string;
  @Input() imageUrl: string;

  constructor(private router: Router){}

  ngOnInit(): void {
    const currentEvent = <EventDetails> {
      name: this.name,
      date: this.date,
      location: this.location,
      imageUrl: this.imageUrl
    }
  }

  redirectToEvent(eventId: string) {
    this.router.navigate(['/events', eventId]);
  }
}

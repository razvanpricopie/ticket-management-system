import { Component, Input, OnInit } from '@angular/core';
import { EventDetails } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() name: string;
  @Input() date: string;
  @Input() location: string;
  @Input() imageUrl: string;

  ngOnInit(): void {
    const currentEvent = <EventDetails> {
      name: this.name,
      date: this.date,
      location: this.location,
      imageUrl: this.imageUrl
    }

    console.log(currentEvent);
  }
}

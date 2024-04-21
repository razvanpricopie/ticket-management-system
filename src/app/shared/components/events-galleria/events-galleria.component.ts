import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EventDetails } from 'src/app/core/models/event.model';

@Component({
  selector: 'events-galleria',
  templateUrl: './events-galleria.component.html',
  styleUrl: './events-galleria.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EventsGalleriaComponent implements OnInit {
  @Input() events: EventDetails[];

  eventsImageUrls: EventImage[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getEventsPhoto();
  }

  redirectToEventPage(eventId: string) {
    this.router.navigate(['/events', eventId]);
  }

  private getEventsPhoto() {
    this.events.forEach((event) => {
      const byteCharacters = atob(event.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });

      this.eventsImageUrls.push({
        itemImageSrc: URL.createObjectURL(blob),
        eventId: event.eventId,
      });
    });
  }
}

interface EventImage {
  itemImageSrc: string;
  eventId: string;
}

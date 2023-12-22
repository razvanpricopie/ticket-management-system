import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetails } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  eventId: string;
  eventDetails: EventDetails;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || "";

    this.eventService.getEventDetails(this.eventId).subscribe((eventDetails) => {
      this.eventDetails = eventDetails;
    });
  }

}

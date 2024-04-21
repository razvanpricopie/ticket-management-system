import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventDetails } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() eventId: string;
  @Input() name: string;
  @Input() date: Date;
  @Input() location: string;
  @Input() image: string;

  imageUrl: SafeUrl;

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64,${this.image}`
    );
  }

  redirectToEvent(eventId: string) {
    this.router.navigate(['/events', eventId]);
  }
}

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EventDetails } from 'src/app/core/models/event.model';

@Component({
  selector: 'events-carousel',
  templateUrl: './events-carousel.component.html',
  styleUrl: './events-carousel.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EventsCarouselComponent implements OnInit {
  @Input() carouselHeader: string;
  @Input() events: EventDetails[];

  constructor() {}
  
  ngOnInit(): void {

  }
}

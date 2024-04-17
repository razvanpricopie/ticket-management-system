import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Ticket } from 'src/app/core/models/event.model';
import { UserOrderTicket } from 'src/app/core/models/order.model';

@Component({
  selector: 'order-ticket-item',
  templateUrl: './order-ticket-item.component.html',
  styleUrls: ['./order-ticket-item.component.scss'],
})
export class OrderTicketItemComponent implements OnInit {
  @Input() ticket: UserOrderTicket;
  @Input() quantity: number;
  @Input() price: number;

  ticketTotalAmount: number;

  imageUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.ticketTotalAmount = this.quantity * this.price;

    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64,${this.ticket.event.image}`
    );
  }
}

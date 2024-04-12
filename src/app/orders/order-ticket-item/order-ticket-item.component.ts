import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.ticketTotalAmount = this.quantity * this.price;
  }
}

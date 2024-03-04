import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/core/models/event.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'cart-ticket-item',
  templateUrl: './cart-ticket-item.component.html',
  styleUrls: ['./cart-ticket-item.component.scss'],
})
export class CartTicketItemComponent implements OnInit, OnDestroy {
  @Input() ticket: Ticket;

  quantitySub: Subscription = new Subscription;

  ticketQuantity: number;
  ticketTotalAmount: number;

  ticketForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.ticketQuantity = this.ticket.quantity;
    this.ticketTotalAmount = this.ticket.price * this.ticket.quantity;

    this.ticketForm = this.formBuilder.group({
      quantity: [this.ticketQuantity, Validators.min(0)],
    });

    this.subscribeToQuantityValueChange();
  }
  
  ngOnDestroy(): void {
    this.quantitySub.unsubscribe();
  }

  removeTicketFromCart() {
    this.cartService.removeTicketFromCart(this.ticket.event);
  }

  private subscribeToQuantityValueChange() {
    this.quantitySub.add(
      this.ticketForm.get('quantity')?.valueChanges.subscribe((newQuantity) => {
        if (newQuantity > this.ticketQuantity) {
          this.cartService.increaseQuantityToCart(this.ticket.event, 1);
          this.ticketQuantity += 1;
        }

        if (newQuantity < this.ticketQuantity) {
          this.cartService.decreaseQuantityToCart(this.ticket.event, 1);
          this.ticketQuantity -= 1;
        }

        this.ticketTotalAmount = this.ticket.price * newQuantity;
      })
    );
  }
}

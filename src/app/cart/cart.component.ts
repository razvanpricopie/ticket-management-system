import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { Ticket } from '../core/models/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, OnDestroy {
  sub: Subscription;
  tickets: Ticket[];

  cartTotalAmount: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.tickets = this.cartService.getCart();

    this.sub = this.cartService.getCartTotalAmount().subscribe((cartTotalAmount) => {
      this.cartTotalAmount = cartTotalAmount;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

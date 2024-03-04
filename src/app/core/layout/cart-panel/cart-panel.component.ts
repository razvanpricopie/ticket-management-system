import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Ticket } from '../../models/event.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss'],
})
export class CartPanelComponent implements OnInit, OnDestroy {
  sub: Subscription;
  tickets: Ticket[];
  cartTotalAmount: number;

  constructor(
    private router: Router,
    private cartService: CartService,
    private dialog: MatDialogRef<CartPanelComponent>
  ) {}

  ngOnInit(): void {
    this.tickets = this.cartService.getCart();
    this.sub = this.cartService
      .getCartTotalAmount()
      .subscribe((cartTotalAmount) => {
        this.cartTotalAmount = cartTotalAmount;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  redirectToCheckout() {
    this.router.navigate(['/cart']);
    this.dialog.close();
  }
}

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { Ticket } from '../core/models/event.model';
import { Subscription } from 'rxjs';
import { CreateOrder, CreateOrderTicket } from '../core/models/order.model';
import { Router } from '@angular/router';
import { OrderService } from '../core/services/order.service';
import { AccountService } from '../core/account/account.service';

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

  isUserLoggedIn: boolean;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tickets = this.cartService.getCart();

    this.sub = this.cartService
      .getCartTotalAmount()
      .subscribe((cartTotalAmount) => {
        this.cartTotalAmount = cartTotalAmount;
      });

    this.isUserLoggedIn = this.accountService.isUserLoggedIn().value;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createOrder() {
    let orderToCreate: CreateOrder = {
      userId: 'c3cb0b6a-033c-4261-8b1d-0e4658544b94',
      orderTotal: this.cartTotalAmount,
      tickets: this.tickets.map((ticket) => {
        return <CreateOrderTicket>{
          eventId: ticket.event.eventId,
          quantity: ticket.quantity,
          price: ticket.price,
        };
      }),
    };

    this.orderService.createOrder(orderToCreate).subscribe((orderId) => {
      this.cartService.refreshCart();
      this.orderService.setOrderComplete(true);
      this.router.navigate(['/order-completed', orderId]);
    });
  }
}

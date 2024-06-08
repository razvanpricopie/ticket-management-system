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
  subscriptions: Subscription[] = [];

  tickets: Ticket[];
  cartTotalAmount: number;

  isUserLoggedIn: boolean = false;
  userId: string;

  loading: boolean = true;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();

    this.tickets = this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  createOrder() {
    let orderToCreate: CreateOrder = {
      userId: this.userId,
      orderTotal: this.cartTotalAmount,
      tickets: this.tickets.map((ticket) => {
        return <CreateOrderTicket>{
          eventId: ticket.event.eventId,
          eventName: ticket.event.name,
          quantity: ticket.quantity,
          price: ticket.price,
        };
      }),
    };

    this.orderService.createOrder(orderToCreate).subscribe((orderId) => {
      this.cartService.refreshCart();
      this.router.navigate(['/order-completed', orderId]);
    });
  }

  createCheckoutSession(){
    let orderToCreate: CreateOrder = {
      userId: this.userId,
      orderTotal: this.cartTotalAmount,
      tickets: this.tickets.map((ticket) => {
        return <CreateOrderTicket>{
          eventId: ticket.event.eventId,
          eventName: ticket.event.name,
          quantity: ticket.quantity,
          price: ticket.price,
        };
      }),
    };

    this.orderService.createCheckoutSession(orderToCreate);
  }

  private initSubscriptions() {
    this.subscriptions.push(
      this.cartService.cartTotalAmount$.subscribe((cartTotalAmount) => {
        this.cartTotalAmount = cartTotalAmount;
        this.loading = false;
      })
    );

    this.subscriptions.push(
      this.accountService.userAuthStatus$.subscribe((isUserLoggedIn) => {
        this.isUserLoggedIn = isUserLoggedIn;
      })
    );

    this.subscriptions.push(
      this.accountService.userDetails$.subscribe((userDetails) => {
        this.userId = userDetails.userId;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  CreateOrder,
  OrderDetails,
  OrderDetailsPreview,
  Session,
  UserOrderDetails,
} from '../models/order.model';
import { BehaviorSubject, Observable, mergeMap, of, tap } from 'rxjs';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

declare const Stripe: any;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderComplete$: Observable<boolean>;

  private readonly basePath = environment.API_ENDPOINT;
  private readonly successUrl = environment.successUrl;
  private readonly failureUrl = environment.failureUrl;

  private orderCompleteSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private cartService: CartService,
    private router: Router
  ) {
    this.orderComplete$ = this.orderCompleteSubject.asObservable();
  }

  // setOrderComplete(status: boolean) {
  //   this.orderCompleteSubject.next(status);
  // }

  getAllOrders(): Observable<OrderDetailsPreview[]> {
    return this.httpClient.get<OrderDetailsPreview[]>(
      `${this.basePath}/api/order/all`
    );
  }

  getOrderDetails(orderId: string): Observable<OrderDetails> {
    return this.httpClient.get<OrderDetails>(
      `${this.basePath}/api/order/${orderId}`
    );
  }

  createOrder(createdOrder: CreateOrder): Observable<string> {
    return this.httpClient.post<string>(
      `${this.basePath}/api/order/addOrder`,
      createdOrder
    );
  }

  getAllUserOrders(userId: string): Observable<UserOrderDetails[]> {
    return this.httpClient.get<UserOrderDetails[]>(
      `${this.basePath}/api/order/allUserOrders/${userId}`
    );
  }

  createCheckoutSession(orderToCreate: CreateOrder): void {
    this.httpClient
      .post<Session>(`${this.basePath}/api/order/createCheckoutSession`, {
        ...orderToCreate,
        successUrl: this.successUrl,
        failureUrl: this.failureUrl,
      })
      .subscribe((session) => {
        this.redirectToCheckout(session);
      });
  }

  private redirectToCheckout(session: Session) {
    const stripe = Stripe(session.pubKey);

    stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  }
}

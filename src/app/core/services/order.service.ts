import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  CreateOrder,
  OrderDetails,
  OrderDetailsPreview,
  UserOrderDetails,
} from '../models/order.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderComplete$: Observable<boolean>;

  private readonly basePath = environment.API_ENDPOINT;
  private orderCompleteSubject = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.orderComplete$ = this.orderCompleteSubject.asObservable();
  }

  setOrderComplete(status: boolean) {
    this.orderCompleteSubject.next(status);
  }

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
}

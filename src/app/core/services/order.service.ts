import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  CreateOrder,
  OrderDetails,
  OrderDetailsPreview,
} from '../models/order.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly basePath = environment.API_ENDPOINT;
  private orderComplete = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  setOrderComplete(status: boolean) {
    this.orderComplete.next(status);
  }

  isOrderComplete(): Observable<boolean> {
    return this.orderComplete.asObservable();
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
}

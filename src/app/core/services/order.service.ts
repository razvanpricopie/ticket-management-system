import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CreateOrder, OrderDetails } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly basePath = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) {}

  getAllOrders(): Observable<OrderDetails[]> {
    return this.httpClient.get<OrderDetails[]>(
      `${this.basePath}/api/order/all`
    );
  }

  getOrderDetails(orderId: string): Observable<OrderDetails> {
    return this.httpClient.get<OrderDetails>(
      `${this.basePath}/api/order/${orderId}`
    );
  }

  createEvent(createdOrder: CreateOrder): Observable<string> {
    return this.httpClient.post<string>(
      `${this.basePath}/api/event/addOrder`,
      createdOrder
    );
  }
}

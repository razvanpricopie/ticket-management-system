import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss'],
})
export class OrderCompletedComponent implements OnInit {
  orderId: string;

  constructor(private orderService: OrderService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.refreshCart();
  }

  // ngOnDestroy(): void {
  //   this.orderService.setOrderComplete(false);
  // }
}

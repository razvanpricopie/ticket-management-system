import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../core/services/order.service';
import { Subscription } from 'rxjs';
import { AccountService } from '../core/account/account.service';
import { UserOrderDetails } from '../core/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  userId: string;

  orders: UserOrderDetails[];

  loading: boolean = true;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private initSubscriptions() {
    this.subscriptions.push(
      this.accountService.userDetails$.subscribe((userDetails) => {
        this.userId = userDetails.userId;
      })
    );

    this.subscriptions.push(
      this.orderService.getAllUserOrders(this.userId).subscribe((orders) => {
        this.orders = orders;
        this.loading = false;
      })
    );
  }
}
